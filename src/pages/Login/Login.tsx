import React, { useEffect } from 'react';
import cn from 'classnames/bind';
import styles from './styles.styl';

const cx = cn.bind(styles);

const Login: React.FC = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('Login__container')}>
      <h1>Пример базовой авторизации на React + Redux + TS</h1>
    </div>
  );
};

export default Login;
