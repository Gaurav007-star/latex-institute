import { configureStore } from "@reduxjs/toolkit";
import templateSliceReducer  from "./slices/template";

export const store = configureStore({
  reducer: {
    template: templateSliceReducer,
  },
});
