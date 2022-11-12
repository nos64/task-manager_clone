import React from 'react';
import styles from './ConfirmDeleteText.module.scss';
import { TiWarning } from 'react-icons/ti';

const ConfirmDeleteText = () => {
  return (
    <div className={styles.wrapper}>
      <TiWarning size={50} color={'#fc4c4c'} />
      <h1 className={styles.title}>Do you really want to delete your accaunt?</h1>
    </div>
  );
};

export default ConfirmDeleteText;
