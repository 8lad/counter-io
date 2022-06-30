import {
  ADD_SINGLE_TASK,
  DELETE_SINGLE_TASK,
  SET_PIN_TASK,
  UPDATE_SINGLE_TASK,
  DISABLE_PIN_TASK,
  SET_IS_FILTERED,
  SET_SEARCH_RULE,
} from "./types";

export interface SingleTask {
  id: string;
  text: string;
  tags: string;
}

interface InitialState {
  tasks: SingleTask[];
  isTagFiltered: boolean;
  searchField: string;
}

interface Action {
  type: string;
  payload?: SingleTask | string | boolean | any;
}

const initialState: InitialState = {
  tasks: [],
  isTagFiltered: false,
  searchField: "",
};

export const tasksReducer = (state = initialState, action: Action) => {
  const { tasks } = state;
  const taskIndex = tasks.findIndex((item) => item.id === action.payload);
  const currentTask = tasks.slice(taskIndex, taskIndex + 1);

  switch (action.type) {
    case ADD_SINGLE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_SINGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      };
    case SET_PIN_TASK:
      return {
        ...state,
        tasks: [...currentTask, ...tasks.slice(0, taskIndex).concat(tasks.slice(taskIndex + 1))],
      };
    case DISABLE_PIN_TASK:
      return {
        ...state,
        tasks: [...tasks.slice(0, taskIndex).concat(tasks.slice(taskIndex + 1)), ...currentTask],
      };
    case UPDATE_SINGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case SET_IS_FILTERED:
      return {
        ...state,
        isTagFiltered: action.payload,
      };
    case SET_SEARCH_RULE:
      return {
        ...state,
        searchField: action.payload,
      };
    default:
      return state;
  }
};
