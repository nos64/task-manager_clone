import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteButton = () => {
  const [isButtonClick, setIsButtonClick] = useState(false);

  const handleDelButtonClick = () => setIsButtonClick(true);

  const handleCloseConfirmModal = () => {
    setIsButtonClick(false);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.deleteBtn}>
        <FaTrashAlt /> DELETE ACCAUNT
      </button>
    </div>
  );
};

export default DeleteButton;
