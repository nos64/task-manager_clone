import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import WarningModal from 'components/WarningModal';
import { deleteAccountWarningMessage } from 'common/constants';
import { useAppDispatch } from 'hooks/redux';
import { deleteUserAccount } from 'store/reducers/userSlice';
import { setActiveBoard, setBoards } from 'store/reducers/boardsSlice';

const DeleteButton = () => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setModalActive(false);
  };

  const deleteAccount = () => {
    dispatch(deleteUserAccount());
    dispatch(setBoards([]));
    dispatch(setActiveBoard(null));
  };

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
