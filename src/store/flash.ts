import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFlashMessage } from '../interfaces/flash';

const flashSlice = createSlice({
  name: 'flash',
  initialState: { type: null, messages: [], title: '' } as IFlashMessage,
  reducers: {
    showFlash(state, action: PayloadAction<IFlashMessage>) {
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.messages = Array.isArray(action.payload.messages)
        ? action.payload.messages
        : [action.payload.messages];
    },
    removeFlash(state) {
      state.title = null;
      state.type = null;
      state.messages = null;
    },
  },
});

export const { removeFlash, showFlash } = flashSlice.actions;

export default flashSlice.reducer;
