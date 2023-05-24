import {createSlice} from '@reduxjs/toolkit';
import {signUp} from './reduxThunk';
const initialState = {
  result: [],
  isLoading: false,
};
const reduxSlices = createSlice({
  name: 'reduxSlices',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, (state, action) => {})
      .addCase(signUp.fulfilled, (state, action) => {
        // if (action.payload.statusCode === 200) {
        //   state.result = [...action.payload.content];
        // }
        console.log(action);
      });
  },
});

export default reduxSlices.reducer;
