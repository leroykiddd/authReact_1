import React from 'react';
import styles from './styles.styl';
import { Loader } from '@consta/uikit/Loader';

const CenterLoader: React.FC = () => {
  return (
    <div className={styles.CenterLoader}>
      <Loader />
    </div>
  );
};

export default CenterLoader;
