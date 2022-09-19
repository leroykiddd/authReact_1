import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { ErrorResponse } from '../types';
import { AuthUserResponseType, LoginUserRequestType } from './types';

const authPromise = () =>
  new Promise<AuthUserResponseType>((resolve) =>
    setTimeout(
      () =>
        resolve({
          token: nanoid(),
          user: {
            id: 1,
          },
        }),
      1000,
    ),
  );

export const fetchLoginUser = createAsyncThunk(
  'auth/fetchLoginUser',
  async (data: LoginUserRequestType, thunkAPI) => {
    try {
      const response = await authPromise();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  },
);
