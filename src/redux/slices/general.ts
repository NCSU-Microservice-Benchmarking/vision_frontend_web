import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: 'en-US',
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      return state;
    },
  },
})

export const { setLanguage  } = generalSlice.actions

export default generalSlice.reducer;