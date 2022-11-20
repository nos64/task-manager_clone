import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { scrollController } from '../../utils/scrollController';

interface ModalProps {
  modalActive: boolean;
  setModalActive: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalActive, setModalActive, children }) => {
  useEffect(() => {
    modalActive ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [modalActive]);

  return (
    <div
      className={modalActive ? styles.modal + ' ' + styles.active : styles.modal}
      onClick={setModalActive}
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
