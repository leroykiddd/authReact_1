import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const selectSelf = (state: RootState) => state;

export const selectContacts = createDraftSafeSelector(
  selectSelf,
  (state) => state.contactsSlice.contacts,
);

export const selectContactsStatus = createDraftSafeSelector(
  selectSelf,
  (state) => state.contactsSlice.status,
);
