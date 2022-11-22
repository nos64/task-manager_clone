import React from 'react';
import styles from './WarningModal.module.scss';
import { TiWarning } from 'react-icons/ti';
import Modal from 'components/Modal';

interface WarningModalProps {
  deleteBtnHandler: () => void;
  cancelBtnHandler: () => void;
  message: string;
  isModalActive: boolean;
}

const WarningModal: React.FC<WarningModalProps> = ({
  deleteBtnHandler,
  cancelBtnHandler,
  message,
  isModalActive,
}) => {
  return (
    <Modal modalActive={isModalActive} setModalActive={cancelBtnHandler}>
      <div className={styles.wrapper}>
        <TiWarning size={50} color={'#fc4c4c'} />
        <p className={styles.title}>Do you really want to {message}?</p>
        <div className={styles.buttonsWrapper}>
          <button className={styles.deleteBtn} type="button" onClick={deleteBtnHandler}>
            Delete
          </button>
          <button className={styles.submitBtn} type="button" onClick={cancelBtnHandler}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
