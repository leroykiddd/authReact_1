import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromLS, getUserIdFromLS } from 'src/utils';
import { RequestStatusEnum } from '../../utilities';
import { fetchLoginUser } from './actionCreators';
import { AuthUserResponseType } from './types';

export type AuthState = {
  status: RequestStatusEnum;
  isAuth: boolean;
  user_id: number | null;
  token: string | null;
  error: string | null;
};

const token = getTokenFromLS();
const user_id = getUserIdFromLS();

const initialState: AuthState = {
  error: null,
  status: RequestStatusEnum.SHOULD_LOAD,
  isAuth: !!token && !!user_id,
  user_id: user_id,
  token: token,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(
      state,
      action: PayloadAction<Pick<AuthState, 'isAuth' | 'token' | 'user_id'>>,
    ) {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    setIsNotAuth(state) {
      state.isAuth = false;
      state.token = null;
      state.user_id = null;
      state.status = RequestStatusEnum.SHOULD_LOAD;
    },
  },
  extraReducers: {
    [fetchLoginUser.fulfilled.type]: (
      state,
      action: PayloadAction<AuthUserResponseType>,
    ) => {
      state.status = RequestStatusEnum.LOADED;
      state.error = null;
      state.token = action.payload.token;
      state.isAuth = true;
      state.user_id = action.payload.user.id;
    },
    [fetchLoginUser.pending.type]: (state) => {
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
      state.token = null;
      state.isAuth = false;
    },
    [fetchLoginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.payload;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setAuthData, setIsNotAuth } = authSlice.actions;

export default authSlice.reducer;
