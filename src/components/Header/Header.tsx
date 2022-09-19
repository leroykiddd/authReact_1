import React, { useState } from 'react';
import styles from './styles.styl';
import { Header as ConstaHeader, HeaderModule } from '@consta/uikit/Header';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { User } from '@consta/uikit/User';
import { AuthModal } from '../AuthModal';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { selectAuthState } from 'src/store/features/auth/authSelectors';
import { IconUnlock } from '@consta/uikit/IconUnlock';
import { selectUserState } from 'src/store/features/user/userSelectors';
import history from 'src/utils/history';
import { PublicRoutesEnum } from 'src/router';
import { setIsNotAuth } from 'src/store/features/auth/authSlice';

const Header: React.FC = () => {
  // navigate

  // redux state
  const dispatch = useAppDispatch();
  const {
    auth: { isAuth },
    userInit: { user },
  } = useAppSelector((state) => ({
    auth: selectAuthState(state),
    userInit: selectUserState(state),
  }));

  // component state
  const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);

  // callbacks
  const login = () => {
    setAuthModalIsOpen(true);
  };

  const logout = () => {
    localStorage.clear();
    dispatch(setIsNotAuth());
    history.replace(PublicRoutesEnum.LOGIN);
  };

  const closeAuthModal = () => setAuthModalIsOpen(false);

  return (
    <div>
      <ConstaHeader
        leftSide={
          <>
            <HeaderModule>
              <Text weight="semibold" size="2xl" cursor="pointer">
                App
              </Text>
            </HeaderModule>
          </>
        }
        rightSide={
          <>
            {isAuth && user ? (
              <div className={styles.Header__user}>
                <User info={user.email} name={user?.name ?? ''} />
                <Button
                  onlyIcon
                  iconRight={IconUnlock}
                  size="m"
                  onClick={logout}
                  view="clear"
                />
              </div>
            ) : (
              <div className={styles.Header__login}>
                <Button size="s" label="Вход" onClick={login} />
              </div>
            )}
          </>
        }
      />
      <Modal isOpen={authModalIsOpen}>
        <AuthModal closeModal={closeAuthModal} />
      </Modal>
    </div>
  );
};

export default Header;
