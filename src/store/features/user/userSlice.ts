import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusEnum } from '../../utilities';
import { fetchUserInit } from './actionCreators';
import { UserType } from './types';

export type AuthState = {
  status: RequestStatusEnum;
  user: UserType | null;
  error: string | null;
};

const initialState: AuthState = {
  error: null,
  status: RequestStatusEnum.SHOULD_LOAD,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInit(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [fetchUserInit.fulfilled.type]: (
      state,
      action: PayloadAction<UserType>,
    ) => {
      state.status = RequestStatusEnum.LOADED;
      state.error = null;
      state.user = action.payload;
    },
    [fetchUserInit.pending.type]: (state) => {
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
      state.user = null;
    },
    [fetchUserInit.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.payload;
      state.user = null;
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;
