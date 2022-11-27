import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { scrollController } from '../../utils/scrollController';
import { useAppSelector } from 'hooks/redux';

interface ModalProps {
  modalActive: boolean;
  setModalActive: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalActive, setModalActive, children }) => {
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);

  useEffect(() => {
    modalActive || isBurgerOpen
      ? scrollController.disableScroll()
      : scrollController.enableScroll();
  }, [modalActive, isBurgerOpen]);

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
