import { ref, child, get } from "firebase/database";
import { database } from "../firebase";
import { SingleTask, Action } from "./tasksReducer";
import { setData } from "../helpers/helpers";

import {
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

const dbRef = ref(database);

//  setData("baseData", tasks);

export const setSearchRule = (payload: string): Action<string> => ({ type: SET_SEARCH_RULE, payload });

export const setIsFiltered = (payload: boolean): Action<boolean> => ({ type: SET_IS_FILTERED, payload });

export const addSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: ADD_SINGLE_TASK, payload });

export const deleteSingleTask = (payload: string): Action<string> => ({ type: DELETE_SINGLE_TASK, payload });

export const setPinTask = (payload: string): Action<string> => ({ type: SET_PIN_TASK, payload });

export const disablePinTask = (payload: string): Action<string> => ({ type: DISABLE_PIN_TASK, payload });

export const updateSingleTask = (payload: SingleTask): Action<SingleTask> => ({ type: UPDATE_SINGLE_TASK, payload });

export const setLoadingState = (payload: boolean): Action<boolean> => ({ type: SET_LOADING_STATE, payload });

export const setErrorMessage = (payload: string): Action<string> => ({ type: SET_ERROR_MESSAGE, payload });

export const setAllTasks = (payload: SingleTask[]): Action<SingleTask[]> => ({ type: SET_ALL_TASKS, payload });

// async actions

export const disablePinTaskWithDB = (payload: string, tasks: SingleTask[] | []) => async (dispatch: any) => {
  const taskIndex = tasks.findIndex((item) => item.id === payload);
  const currentTask = tasks.slice(taskIndex, taskIndex + 1)[0];
  try {
    dispatch(disablePinTask(payload));
    setData("baseData", [
      ...tasks.slice(0, taskIndex).concat(tasks.slice(taskIndex + 1)),
      { ...currentTask, isPinned: false },
    ]);
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};

export const setPinTaskWithDB = (payload: string, tasks: SingleTask[] | []) => async (dispatch: any) => {
  const taskIndex = tasks.findIndex((item) => item.id === payload);
  const currentTask = tasks.slice(taskIndex, taskIndex + 1)[0];
  try {
    dispatch(setPinTask(payload));
    setData("baseData", [
      { ...currentTask, isPinned: true },
      ...tasks.slice(0, taskIndex).concat(tasks.slice(taskIndex + 1)),
    ]);
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};

export const addSingleTaskWithDB = (payload: SingleTask, tasks: SingleTask[] | []) => async (dispatch: any) => {
  try {
    dispatch(addSingleTask(payload));
    setData("baseData", [...tasks, payload]);
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};

export const updateSingleTaskWithDB = (payload: SingleTask, tasks: SingleTask[] | []) => async (dispatch: any) => {
  try {
    dispatch(updateSingleTask(payload));
    setData("baseData", [...tasks.map((item) => (item.id === payload.id ? payload : item))]);
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};

export const deleteSingleTaskWithDB = (payload: string, tasks: SingleTask[] | []) => async (dispatch: any) => {
  try {
    dispatch(deleteSingleTask(payload));
    setData("baseData", [...tasks.filter((item) => item.id !== payload)]);
    dispatch(setErrorMessage(""));
  } catch (e) {
    const error = e as Error;
    dispatch(setErrorMessage(error.message));
  }
};

export const loadAllTasks = () => async (dispatch: any) => {
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
