import { SingleTask, Action } from "./tasksReducer";
import {
  CLEAN_SINGLE_TASK,
  ADD_SINGLE_TASK,
  DELETE_SINGLE_TASK,
  SET_PIN_TASK,
  UPDATE_SINGLE_TASK,
  DISABLE_PIN_TASK,
  SET_IS_FILTERED,
  SET_SEARCH_RULE,
} from "./types";

export const setSearchRule = (payload: string): Action<string> => ({ type: SET_SEARCH_RULE, payload });

export const setIsFiltered = (payload: boolean): Action<boolean> => ({ type: SET_IS_FILTERED, payload });

export const cleanSingleTask = (): Action<SingleTask> => ({ type: CLEAN_SINGLE_TASK });

export const addSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: ADD_SINGLE_TASK, payload });

export const deleteSingleTask = (payload: string): Action<string> => ({ type: DELETE_SINGLE_TASK, payload });

export const setPinTask = (payload: string): Action<string> => ({ type: SET_PIN_TASK, payload });

export const disablePinTask = (payload: string): Action<string> => ({ type: DISABLE_PIN_TASK, payload });

export const updateSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: UPDATE_SINGLE_TASK, payload });
