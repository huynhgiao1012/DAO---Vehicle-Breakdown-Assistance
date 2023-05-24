import {configureStore} from '@reduxjs/toolkit';
import reduxSlices from './src/screens/reduxToolkit/reduxSlices';

export const store = configureStore({
  reducer: {
    reduxSlices,
  },
});
