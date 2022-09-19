import { LocalStorageKeys } from './enum';

export const getTokenFromLS = (): null | string => {
  return localStorage.getItem(LocalStorageKeys.TOKEN);
};

export const getUserIdFromLS = (): null | number => {
  const userId = localStorage.getItem(LocalStorageKeys.USER_ID);
  return userId ? Number(userId) : null;
};

export const saveAuthDataInLS = (token: string, userId: number): void => {
  localStorage.setItem(LocalStorageKeys.TOKEN, token);
  localStorage.setItem(LocalStorageKeys.USER_ID, String(userId));
};
