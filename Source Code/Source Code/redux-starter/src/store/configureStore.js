import { configureStore } from "@reduxjs/toolkit";
import reducer from "./projects";

export default function () {
  return configureStore({ reducer });
}

// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default function configureStore() {
//   const store = createStore(reducer, devToolsEnhancer({ trace: true }));
//   return store;
// }
