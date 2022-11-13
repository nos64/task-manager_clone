import React from 'react';
import styles from './ConfirmDeleteText.module.scss';
import { TiWarning } from 'react-icons/ti';

interface IConfirmModalProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDeleteText: React.FC<IConfirmModalProps> = ({ setModalActive }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <TiWarning size={50} color={'#fc4c4c'} />
        <p className={styles.title}>Do you really want to delete your accaunt?</p>
      </div>
      <div className={styles.buttonsWrapper}>
        <button className={styles.deleteBtn} type="button">
          DELETE
        </button>
        <button className={styles.submitBtn} type="button" onClick={() => setModalActive(false)}>
          CANCEL
        </button>
      </div>
    </>
  );
};

export default ConfirmDeleteText;
