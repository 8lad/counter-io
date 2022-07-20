import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setData, getAllData, returnErrorText } from "../helpers/helpers";
import { Action, SingleTask } from "../types";

interface InitialState {
  tasks: SingleTask[];
  isTagFiltered: boolean;
  searchField: string;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: InitialState = {
  tasks: [],
  isTagFiltered: false,
  searchField: "",
  isLoading: false,
  errorMessage: "",
};

export const fetchAllTasks = createAsyncThunk<SingleTask[], void, { rejectValue: string }>(
  "tasks/fetchAllTasks",
  async (_, thunkApi) => {
    try {
      return await getAllData();
    } catch (e) {
      return thunkApi.rejectWithValue(returnErrorText(e as Error));
    }
  },
);

export const fetchSetPinTask = createAsyncThunk<SingleTask[], Action<string, SingleTask[]>, { rejectValue: string }>(
  "tasks/fetchPinTask",
  async (data, thunkApi) => {
    const { option, payload } = data;
    const taskIndex = payload!.findIndex((item) => item.id === option);
    const currentTask = payload!.slice(taskIndex, taskIndex + 1)[0];
    try {
      await setData("baseData", [
        { ...currentTask, isPinned: true },
        ...payload!.slice(0, taskIndex).concat(payload!.slice(taskIndex + 1)),
      ]);
      return await getAllData();
    } catch (e) {
      return thunkApi.rejectWithValue(returnErrorText(e as Error));
    }
  },
);

export const fetchDisablePinTask = createAsyncThunk<
  SingleTask[],
  Action<string, SingleTask[]>,
  { rejectValue: string }
>("tasks/fetchDisablePinTask", async (data, thunkApi) => {
  const { option, payload } = data;
  const taskIndex = payload!.findIndex((item) => item.id === option);
  const currentTask = payload!.slice(taskIndex, taskIndex + 1)[0];
  try {
    await setData("baseData", [
      ...payload!.slice(0, taskIndex).concat(payload!.slice(taskIndex + 1)),
      { ...currentTask, isPinned: false },
    ]);
    return await getAllData();
  } catch (e) {
    return thunkApi.rejectWithValue(returnErrorText(e as Error));
  }
});

export const fetchDeleteSingleTask = createAsyncThunk<
  SingleTask[],
  Action<string, SingleTask[]>,
  { rejectValue: string }
>("tasks/fetchDeleteSingleTask", async (data, thunkApi) => {
  const { option, payload } = data;
  try {
    await setData("baseData", [...payload!.filter((item) => item.id !== option)]);
    return await getAllData();
  } catch (e) {
    return thunkApi.rejectWithValue(returnErrorText(e as Error));
  }
});
export const fetchUpdateSingleTask = createAsyncThunk<
  SingleTask[],
  Action<SingleTask, SingleTask[]>,
  { rejectValue: string }
>("tasks/fetchUpdateSingleTask", async (data, thunkApi) => {
  const { option, payload } = data;
  try {
    await setData("baseData", [...payload!.map((item) => (item.id === option.id ? option : item))]);
    return await getAllData();
  } catch (e) {
    return thunkApi.rejectWithValue(returnErrorText(e as Error));
  }
});

export const fetchAddSingleTask = createAsyncThunk<
  SingleTask[],
  Action<SingleTask, SingleTask[]>,
  { rejectValue: string }
>("tasks/fetchAddSingleTask", async (data, thunkApi) => {
  const { option, payload } = data;
  const newTasksList = [...payload!];
  newTasksList.push(option);
  try {
    await setData("baseData", newTasksList);
    return await getAllData();
  } catch (e) {
    return thunkApi.rejectWithValue(returnErrorText(e as Error));
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setIsFiltered: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isTagFiltered = action.payload;
    },
    setSearchRule: (state: InitialState, action: PayloadAction<string>) => {
      state.searchField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload!;
      })
      .addCase(fetchSetPinTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchSetPinTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchSetPinTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload!;
      })
      .addCase(fetchDisablePinTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchDisablePinTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDisablePinTask.rejected, (state, action) => {
        state.errorMessage = action.payload!;
        state.isLoading = false;
      })
      .addCase(fetchDeleteSingleTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchDeleteSingleTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDeleteSingleTask.rejected, (state, action) => {
        state.errorMessage = action.payload!;
        state.isLoading = false;
      })
      .addCase(fetchUpdateSingleTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchUpdateSingleTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchUpdateSingleTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload!;
      })
      .addCase(fetchAddSingleTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchAddSingleTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAddSingleTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload!;
      })
      .addDefaultCase(() => {});
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { setIsFiltered, setSearchRule } = tasksSlice.actions;
