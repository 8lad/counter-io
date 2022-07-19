import { combineReducers } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasksSlice";

export const rootReducer = combineReducers({
  tasksReducer,
});

export type StateType = ReturnType<typeof rootReducer>;
