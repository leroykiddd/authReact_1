import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/http';
import { ApiUrlEnum } from 'src/utils';
import { UserType } from './types';

export const fetchUserInit = createAsyncThunk(
  'user/fetchUserInit',
  async (id: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get<UserType>(
        `${ApiUrlEnum.USER_INIT}${id}`,
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователя!');
    }
  },
);
