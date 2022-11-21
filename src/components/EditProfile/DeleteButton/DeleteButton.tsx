import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import WarningModal from 'components/WarningModal';
import { deleteAccountWarningMessage } from 'common/constants';

const DeleteButton = () => {
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    setModalActive(false);
  };

  const deleteAccount = () => {};

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.deleteBtn} onClick={() => setModalActive(true)}>
          <FaTrashAlt /> DELETE ACCAUNT
        </button>
      </div>
      <WarningModal
        deleteBtnHandler={deleteAccount}
        cancelBtnHandler={closeModal}
        message={deleteAccountWarningMessage}
        isModalActive={modalActive}
      />
    </>
  );
};

export default DeleteButton;
