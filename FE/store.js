import {configureStore} from '@reduxjs/toolkit';
import ReduxSlices from './src/reduxToolkit/ReduxSlices';

export const store = configureStore({
  reducer: {
    reduxReducer: ReduxSlices,
  },
});
