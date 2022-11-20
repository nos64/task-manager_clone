import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'components/Modal';
import ConfirmDelete from './ConfirmDelete';

const DeleteButton = () => {
  const [modalActive, setModalActive] = useState(false);

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.deleteBtn} onClick={() => setModalActive(true)}>
          <FaTrashAlt /> DELETE ACCAUNT
        </button>
      </div>
      <Modal modalActive={modalActive} setModalActive={closeModal}>
        <ConfirmDelete setModalActive={setModalActive} />
      </Modal>
    </>
  );
};

export default DeleteButton;
