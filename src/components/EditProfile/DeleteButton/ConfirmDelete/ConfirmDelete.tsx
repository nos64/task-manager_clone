import React from 'react';
import styles from './ConfirmDelete.module.scss';
import { TiWarning } from 'react-icons/ti';

interface IConfirmDeleteProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDelete: React.FC<IConfirmDeleteProps> = ({ setModalActive }) => {
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

export default ConfirmDelete;
