import { combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
  tasksReducer,
});

export type StateType = ReturnType<typeof rootReducer>;
