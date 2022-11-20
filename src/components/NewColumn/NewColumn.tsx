import React from 'react';
import styles from './NewColumn.module.scss';
import { BsPlusCircle } from 'react-icons/bs';

interface NewColumnProps {
  toggleModal: () => void;
}

const NewColumn: React.FC<NewColumnProps> = ({ toggleModal }) => {
  return (
    <div className={styles.newColumn} onClick={toggleModal}>
      <BsPlusCircle className={styles.newColumnIcon} />
      <p className={styles.newColumnTitle}>Add column</p>
    </div>
  );
};

export default NewColumn;
