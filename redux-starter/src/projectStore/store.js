import { configureStore } from '@reduxjs/toolkit';
import reducer from './projects.js';

export default function () {
  return configureStore({ reducer });
}
