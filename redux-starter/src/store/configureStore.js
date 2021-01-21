// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./bugs";

export default function() {
    return configureStore({ reducer });
};

// export default function() {
//     const store = createStore(
//         reducer,
//         devToolsEnhancer({ trace: true })
//     );
        
//     return store;
// };