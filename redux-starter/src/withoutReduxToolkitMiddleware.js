import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer.js';
import logger from './combineStore/middleware/logger.js';

// Apply middleware without using redux/toolkit
// We can pass one or more middleware function.
// This applied middleware is called a store enhancer,
// which is a function that allows us to enhance our store.
const store = createStore(reducer, applyMiddleware(logger));
