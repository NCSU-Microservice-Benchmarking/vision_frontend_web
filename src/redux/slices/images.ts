import { createSlice } from "@reduxjs/toolkit";

interface imagesState {
  current: null | image, 
  originals: null | image[]
  edited: null | image[],
  results: any
}

const initialState: imagesState = {
  current: null,
  originals: null,
  edited: null,
  results: null
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.edited = action.payload;
      return state;
    },
    setOriginals: (state, action) => {
      let current = state.originals;
      if (current) {
        current.push(action.payload);
      } else {
        state.originals = [action.payload];
      }
      return state;
    },
    setEdited: (state, action) => {
      state.edited = action.payload;
      return state;
    },
    setResults: (state, action) => {
      state.results = action.payload;
      return state;
    },
  },
})

export const { setOriginals, setEdited, setResults, setCurrent } = imagesSlice.actions

export default imagesSlice.reducer;