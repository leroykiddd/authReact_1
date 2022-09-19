import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkQueryErrorLogger } from './middlewares/errorMiddleware';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import contactsSlice from './features/contacts/contactsSlice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  contactsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend()
        // prepend and concat calls can be chained
        .concat(rtkQueryErrorLogger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
