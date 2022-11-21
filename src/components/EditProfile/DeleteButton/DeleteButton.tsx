import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'components/Modal';
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
      <Modal modalActive={modalActive} setModalActive={closeModal}>
        <WarningModal
          deleteBtnHandler={deleteAccount}
          cancelBtnHandler={closeModal}
          message={deleteAccountWarningMessage}
        />
      </Modal>
    </>
  );
};

export default DeleteButton;
