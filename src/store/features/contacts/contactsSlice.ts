import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateContactType } from 'src/components/CreateContactModal/CreateContactModal';
import { RequestStatusEnum } from '../../utilities';
import { fetchContacts } from './actionCreators';
import { ContactsResponseType, ContactType } from './types';

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
  reducers: {
    addContact: (state, action: PayloadAction<CreateContactType>) => {
      state.contacts = [
        { ...action.payload, id: state.contacts.length + 1 },
        ...state.contacts,
      ];
    },
    editContact: (state, action: PayloadAction<ContactType>) => {
      const data = action.payload;
      state.contacts = state.contacts.map((contact) =>
        contact.id === data.id ? data : contact,
      );
    },
    removeContact: (state, action: PayloadAction<{ id: number }>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id,
      );
    },
  },
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

export const { addContact, removeContact, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
