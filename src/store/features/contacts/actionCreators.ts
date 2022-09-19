import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/http';
import { ApiUrlEnum } from 'src/utils';
import { ContactsResponseType } from './types';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ContactsResponseType>(
        ApiUrlEnum.CONTACTS,
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Не удалось загрузить контакты!');
    }
  },
);
