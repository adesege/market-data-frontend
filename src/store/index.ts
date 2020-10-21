import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import flashReducer from './flash';
import marketReducer from './market';
import searchReducer from './search';

const store = configureStore({
  reducer: {
    auth: authReducer,
    flash: flashReducer,
    market: marketReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
