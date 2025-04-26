import { configureStore } from '@reduxjs/toolkit';
import AiReducer from './reducer';

const store = configureStore({
  reducer: {
    incident: AiReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export {};