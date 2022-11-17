import React from 'react';
import styles from './NewBoard.module.scss';
import { BsPlusCircle } from 'react-icons/bs';

const NewBoard = () => {
  return (
    <div className={styles.newBoard}>
      <BsPlusCircle className={styles.icon} />
      <p className={styles.title}>Add board</p>
    </div>
  );
};

export default NewBoard;
