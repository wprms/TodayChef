import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiErrorLogger } from './apiErrorLogger';
import { alertSlice } from '../utils/alertSlice';
import { uiSlice } from '../utils/uiSlice';

export const store = configureStore({
  reducer: {
//    user: userSlice.reducer,
    alert: alertSlice.reducer,
    ui: uiSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([api.middleware, apiErrorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;