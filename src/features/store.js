import noteReducer from './note/noteSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

export default store;
