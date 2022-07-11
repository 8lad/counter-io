import { ref, child, get } from "firebase/database";
import { database } from "../firebase";
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
  SET_LOADING_STATE,
  SET_ERROR_MESSAGE,
  SET_ALL_TASKS,
} from "./types";

export const setSearchRule = (payload: string): Action<string> => ({ type: SET_SEARCH_RULE, payload });

export const setIsFiltered = (payload: boolean): Action<boolean> => ({ type: SET_IS_FILTERED, payload });

export const cleanSingleTask = (): Action<SingleTask> => ({ type: CLEAN_SINGLE_TASK });

export const addSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: ADD_SINGLE_TASK, payload });

export const deleteSingleTask = (payload: string): Action<string> => ({ type: DELETE_SINGLE_TASK, payload });

export const setPinTask = (payload: string): Action<string> => ({ type: SET_PIN_TASK, payload });

export const disablePinTask = (payload: string): Action<string> => ({ type: DISABLE_PIN_TASK, payload });

export const updateSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: UPDATE_SINGLE_TASK, payload });

export const setLoadingState = (payload: boolean): Action<boolean> => ({ type: SET_LOADING_STATE, payload });

export const setErrorMessage = (payload: string): Action<string> => ({ type: SET_ERROR_MESSAGE, payload });

export const setAllTasks = (payload: SingleTask[]): Action<SingleTask[]> => ({ type: SET_ALL_TASKS, payload });

export const loadAllTasks = async (dispatch: any) => {
  const dbRef = ref(database);
  try {
    dispatch(setLoadingState(true));
    const response = await get(child(dbRef, "baseData"));
    const allTasks = await response.val();
    const allTasksList = allTasks ?? [];
    dispatch(setAllTasks(allTasksList));
    dispatch(setLoadingState(false));
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};
