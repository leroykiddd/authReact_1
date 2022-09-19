import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const selectSelf = (state: RootState) => state;

export const selectAuthState = createDraftSafeSelector(
  selectSelf,
  (state) => state.authReducer,
);
