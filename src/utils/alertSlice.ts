import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  callbackConfirm?: () => void;
  callbackCancel?: () => void;
  isAlert?: boolean;
}

const initialState: AlertState = {
  title: undefined,
  message: undefined,
  confirmText: undefined,
  cancelText: undefined,
  callbackConfirm: undefined,
  callbackCancel: undefined,
  isAlert: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
      state.callbackConfirm = action.payload.callbackConfirm;
      state.callbackCancel = action.payload.callbackCancel;
      state.isAlert = action.payload.isAlert;
    },
  },
});

export const { showAlert } = alertSlice.actions;
export default alertSlice.reducer;