import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { scrollController } from '../../utils/scrollController';

interface IConfirmModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Modal: React.FC<IConfirmModalProps> = ({ modalActive, setModalActive, children }) => {
  useEffect(() => {
    modalActive ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [modalActive]);

  return (
    <div
      className={modalActive ? styles.modal + ' ' + styles.active : styles.modal}
      onClick={() => setModalActive(false)}
    >
      <div
        className={
          modalActive ? styles.modalContent + ' ' + styles.modalContentActive : styles.modalContent
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
