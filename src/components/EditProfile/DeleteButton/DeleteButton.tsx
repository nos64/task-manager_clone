import React, { useState } from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import WarningModal from 'components/WarningModal';
import { useTranslation } from 'react-i18next';

const DeleteButton = () => {
  const [modalActive, setModalActive] = useState(false);

  const { t } = useTranslation();

  const closeModal = () => {
    setModalActive(false);
  };

  const deleteAccount = () => {};

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.deleteBtn} onClick={() => setModalActive(true)}>
          <FaTrashAlt /> {t('deleteAccountButton')}
        </button>
      </div>
      <WarningModal
        deleteBtnHandler={deleteAccount}
        cancelBtnHandler={closeModal}
        message={t('deleteAccountWarningMessage')}
        isModalActive={modalActive}
      />
    </>
  );
};

export default DeleteButton;
