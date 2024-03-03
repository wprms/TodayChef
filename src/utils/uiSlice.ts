import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showProgress: boolean;
  showAddPost: boolean;
  showRequestNewCompany: boolean;
}

const initialState: UIState = {
  showProgress: false,
  showAddPost: false,
  showRequestNewCompany: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowProgress: (state, action: PayloadAction<boolean>) => {
      state.showProgress = action.payload;
    },
    setShowAddPost: (state, action: PayloadAction<boolean>) => {
      state.showAddPost = action.payload;
    },
    setShowRequestNewCompany: (state, action: PayloadAction<boolean>) => {
      state.showRequestNewCompany = action.payload;
    },
  },
});

export const {
  setShowProgress,
  setShowAddPost,
  setShowRequestNewCompany,
} = uiSlice.actions;
export default uiSlice.reducer;