import {createSlice} from '@reduxjs/toolkit';
import {signUp} from './ReduxThunk';
const initialState = {
  product: [],
  searchList: [],
};
const ReduxSlices = createSlice({
  name: 'reduxSlices',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, (state, action) => {})
      .addCase(signUp.fulfilled, (state, action) => {
        console.log(action);
      });
  },
});

export default ReduxSlices.reducer;
