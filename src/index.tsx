const React = {
  createElement(tag, props, ...children) {
    if (typeof tag === "function") {
      try {
        return tag(props);
      } catch ({ key, promise }) {
        promise.then((data) => {
          closureAsyncResources.set(key, data);
          rerender();
        });

        return { tag: "div", props: { children: ["Loading..."] } };
      }
    }
    // else if (children[0] instanceof Promise) {
    //   console.log(`children[0]: ${children[0]}`);
    // }

    const element = { tag, props: { ...props, children } };
    console.log(element);

    return element;
  },
};

// Visible in this module
let closureStates = [];
let closureStateIndex = 0;

function useState(initialState) {
  console.log(`useState with "${initialState}"`);

  const myFixedIndex = closureStateIndex;
  if (!closureStates[myFixedIndex]) {
    closureStates[myFixedIndex] = initialState;
  } else {
    console.log(
      `useState ignores "${initialState}" because closureState is "${closureStates[myFixedIndex]}"`
    );
  }

  const setState = (newState) => {
    console.log(`setState with "${newState}"`);

    closureStates[myFixedIndex] = newState;
    rerender();
  };

  closureStateIndex++;
  return [closureStates[myFixedIndex], setState];
}

// let closureDogPhotoURL = "";
let closureAsyncResources = new Map();
function handleAsyncResources(key, promise) {
  if (closureAsyncResources.has(key)) {
    return closureAsyncResources.get(key);
  } else {
    throw { key, promise };
  }
}

const AppComponent = () => {
  const [name, setName] = useState("Unnamed");
  const [count, setCount] = useState(0);

  const dogPhotoURLPromise = fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((jsonPayload: { message: string }) => jsonPayload.message);

  // dogPhotoURLPromise.then(data => closureDogPhotoURL = data);
  const dogPhotoURL = handleAsyncResources("dogPhotoURL", dogPhotoURLPromise);

  // let dogPhotoURL = "";
  // if (closureAsyncResources.has("dogPhotoURL")) {
  //   dogPhotoURL = closureAsyncResources.get("dogPhotoURL");
  // } else {
  //   throw { key: "dogPhotoURL", promise: dogPhotoURLPromise };
  // }

  const AppElement = (
    <div className="class1" title="Simple tooltip">
      <h1>Hello, {name}!</h1>
      <input
        value={name}
        onchange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Type a name"
      />
      <p>This is a simple test.</p>
      <h2>The count is: {count}</h2>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
      <p title="Dog">{dogPhotoURL}</p>
      <img src={dogPhotoURL} alt="" />
    </div>
  );

  return AppElement;
};

function render(reactElement, container) {
  let htmlElement;
  if (["string", "number"].includes(typeof reactElement)) {
    htmlElement = document.createTextNode(reactElement);
  } else {
    htmlElement = document.createElement(reactElement.tag);
    if (reactElement.props) {
      Object.keys(reactElement.props)
        .filter((key) => key !== "children")
        .forEach((key) => (htmlElement[key] = reactElement.props[key]));

      if (reactElement.props.children) {
        reactElement.props.children.forEach((child) =>
          render(child, htmlElement)
        );
      }
    }
  }

  container.appendChild(htmlElement);
}

render(<AppComponent />, document.getElementById("root"));

function rerender() {
  closureStateIndex = 0;
  document.getElementById("root").firstChild.remove();

  render(<AppComponent />, document.getElementById("root"));
}
