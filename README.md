# Simple Demo to Understand Some React Concepts
A simple demo project to understand two internal design concepts of React.js:
- What is Virtual DOM?
- What is React Hooks?

This is just an entry-level learning project. There is no advanced knowledge here.

## Build
```
npm install
npm run build
```

## Run
```
npx start
```

or

```
npx parcel index.html
```

And then open the link (e.g. http://localhost:1234) in a web browser.

## Notes
#### CORS error
Open the web page in Safari if Chrome doesn't show the image (because of the CORS error).

#### How to create an empty Typescript project?
```
npm init
npm install -D typescript parcel
npx tsc --init
```

## References
- [Talk - Deconstructing React by Tejas Kumar](https://www.youtube.com/watch?v=f2mMOiCSj5c&ab_channel=CodingTech)
- [Parcel - Building a web app with Parcel](https://parceljs.org/getting-started/webapp/)
- [React - Introducing concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html)
