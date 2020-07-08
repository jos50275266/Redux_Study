import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

/*
     Entities
   |         |
   v         v
 Bugs       Projects    
*/

export default function () {
  return configureStore({ reducer });
}
