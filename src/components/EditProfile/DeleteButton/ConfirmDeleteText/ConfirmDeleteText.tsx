import React from 'react';
import styles from './ConfirmDeleteText.module.scss';
import { TiWarning } from 'react-icons/ti';

const ConfirmDeleteText = () => {
  return (
    <div className={styles.wrapper}>
      <TiWarning size={50} color={'#fc4c4c'} />
      <p className={styles.title}>Do you really want to delete your accaunt?</p>
    </div>
  );
};

export default ConfirmDeleteText;
