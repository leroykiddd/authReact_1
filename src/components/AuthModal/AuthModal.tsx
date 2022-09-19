import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.styl';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Text } from '@consta/uikit/Text';
import { IconEyeClose } from '@consta/uikit/IconEyeClose';
import { IconEye } from '@consta/uikit/IconEye';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchLoginUser } from 'src/store/features/auth/actionCreators';
import { RequestStatusEnum } from 'src/store/utilities';
import { saveAuthDataInLS } from 'src/utils';

export interface IAuthModalProps {
  closeModal: () => void;
}

const AuthModal: React.FC<IAuthModalProps> = ({ closeModal }) => {
  // rtk
  const dispatch = useAppDispatch();
  const { isAuth, status, token, user_id } = useAppSelector(
    (state) => state.authReducer,
  );

  // component state
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  // callbacks
  const authUser = () => {
    dispatch(fetchLoginUser({ password, email: login }));
  };

  const checkoutVisible = () => setVisible((prev) => !prev);

  const passwordVisible = useCallback(() => {
    return (
      <Button
        size="s"
        view="clear"
        onlyIcon
        onClick={checkoutVisible}
        iconRight={visible ? IconEyeClose : IconEye}
      />
    );
  }, [visible]);

  // memo values
  const isDisabledLogin = useMemo(
    () => !login || !password || password?.length < 4 || login?.length < 6,
    [login, password],
  );

  // side effects
  useEffect(() => {
    if (status === RequestStatusEnum.LOADED && token && isAuth && user_id) {
      saveAuthDataInLS(token, user_id);
      closeModal();
    }
  }, [isAuth, status, token, user_id, closeModal]);

  return (
    <div className={styles.AuthModal}>
      <div className={styles.AuthModal__body}>
        <Text size="2xl" weight="semibold" className={styles.AuthModal__title}>
          Авторизация
        </Text>
        <TextField
          id="password"
          onChange={({ value }) => setLogin(value)}
          className={styles.AuthModal__login}
          value={login}
          label="Логин"
          placeholder="Введите логин"
          width="full"
        />
        <TextField
          id="login"
          onChange={({ value }) => setPassword(value)}
          value={password}
          type={visible ? 'text' : 'password'}
          label="Пароль"
          placeholder="Введите пароль"
          rightSide={passwordVisible}
          width="full"
        />
      </div>
      <div className={styles.AuthModal__actions}>
        <Button onClick={closeModal} label="Отмена" view="ghost" />
        <Button
          onClick={authUser}
          label="Войти"
          loading={status === RequestStatusEnum.PENDING}
          disabled={isDisabledLogin}
        />
      </div>
    </div>
  );
};

export default AuthModal;
