import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const selectSelf = (state: RootState) => state;

export const selectUserState = createDraftSafeSelector(
  selectSelf,
  (state) => state.userReducer,
);
