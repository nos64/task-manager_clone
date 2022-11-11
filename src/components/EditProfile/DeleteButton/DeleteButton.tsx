import React from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
const DeleteButton = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.deleteBtn}>
        <FaTrashAlt /> DELETE ACCAUNT
      </button>
    </div>
  );
};

export default DeleteButton;
