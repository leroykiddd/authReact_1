import React, { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Contacts } from 'src/pages/Contacts';
import { Login } from 'src/pages/Login';
import { IRouteItem, PrivateRoutesEnum, PublicRoutesEnum } from 'src/router';
import { selectAuthState } from 'src/store/features/auth/authSelectors';
import { fetchUserInit } from 'src/store/features/user/actionCreators';
import { selectUserState } from 'src/store/features/user/userSelectors';
import { RequestStatusEnum } from 'src/store/utilities';
import { CenterLoader } from 'src/components/CenterLoader';
import { Header } from 'src/components/Header';
import { saveAuthDataInLS } from 'src/utils';

export const publicRoutes: Array<IRouteItem> = [];

export const privateRoutes: Array<IRouteItem> = [
  { path: PrivateRoutesEnum.CONTACTS, element: <Contacts /> },
];

export const notAuthRoutes: Array<IRouteItem> = [
  { path: PublicRoutesEnum.LOGIN, element: <Login /> },
];

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const {
    auth: { isAuth, user_id, token },
    userInit: { status: userInitStatus },
  } = useAppSelector((state) => ({
    auth: selectAuthState(state),
    userInit: selectUserState(state),
  }));

  // values
  const isHaveAuthData = useMemo(
    () => token && user_id && isAuth,
    [token, user_id, isAuth],
  );
  const isLoading =
    userInitStatus === RequestStatusEnum.PENDING ||
    (userInitStatus === RequestStatusEnum.SHOULD_LOAD && isHaveAuthData);

  // side effects
  useEffect(() => {
    if (token && user_id && isAuth) {
      saveAuthDataInLS(token, user_id);
      dispatch(fetchUserInit(user_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (isLoading) return <CenterLoader />;

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={isAuth ? PrivateRoutesEnum.CONTACTS : PublicRoutesEnum.LOGIN}
            />
          }
        />

        {[...publicRoutes, ...(isAuth ? privateRoutes : notAuthRoutes)].map(
          (route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ),
        )}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuth ? PrivateRoutesEnum.CONTACTS : PublicRoutesEnum.LOGIN}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
