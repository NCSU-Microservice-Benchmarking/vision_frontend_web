import { createSlice } from "@reduxjs/toolkit";
import tasks from "../../data/tasks";

interface settingsState {
  task: settings["task"],
  model: string
}

const initialState: settingsState = {
  task: 'object_detection',
  model: tasks['object_detection'].models[0]
};

export const settingsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
      return state;
    },
    resetModel: (state) => {
      state.model = tasks[state.task].models[0];
      return state;
    }
  },
})

export const { setTask, setModel, resetModel } = settingsSlice.actions

export default settingsSlice.reducer;