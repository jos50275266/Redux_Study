import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";
import reducer from "./reducer";

// eslint-disable-next-line import/no-anonymous-default-export
export default function() {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            logger({ destination: "Console"}),
            toast,
            api
        ]
    })
}