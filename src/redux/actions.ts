import { SingleTask } from "./tasksReducer";
import {
  CLEAN_SINGLE_TASK,
  ADD_SINGLE_TASK,
  DELETE_SINGLE_TASK,
  SET_PIN_TASK,
  UPDATE_SINGLE_TASK,
  DISABLE_PIN_TASK,
} from "./types";

export const cleanSingleTask = () => ({ type: CLEAN_SINGLE_TASK });

export const addSingleTask = (payload: SingleTask) => ({ type: ADD_SINGLE_TASK, payload });

export const deleteSingleTask = (payload: string) => ({ type: DELETE_SINGLE_TASK, payload });

export const setPinTask = (payload: string) => ({ type: SET_PIN_TASK, payload });

export const disablePinTask = (payload: string) => ({ type: DISABLE_PIN_TASK, payload });

export const updateSingleTask = (payload: SingleTask) => ({ type: UPDATE_SINGLE_TASK, payload });