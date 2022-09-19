import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusEnum } from '../../utilities';
import { fetchContacts } from './actionCreators';
import { ContactsResponseType } from './types';

export type AuthState = {
  status: RequestStatusEnum;
  contacts: ContactsResponseType | null;
  error: string | null;
};

const initialState: AuthState = {
  error: null,
  status: RequestStatusEnum.SHOULD_LOAD,
  contacts: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<ContactsResponseType>,
    ) => {
      state.status = RequestStatusEnum.LOADED;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.pending.type]: (state) => {
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
      state.contacts = null;
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.payload;
      state.contacts = null;
    },
  },
});

export default contactsSlice.reducer;
