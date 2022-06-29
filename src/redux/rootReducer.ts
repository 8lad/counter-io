import { combineReducers } from "redux";
import { singleTaskReducer } from "./singleTaskReducer";
import { tasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
  singleTaskReducer,
  tasksReducer,
});
