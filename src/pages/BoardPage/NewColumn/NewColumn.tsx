import React from 'react';
import styles from './NewColumn.module.scss';
import { BsPlusCircle } from 'react-icons/bs';

const NewColumn = () => {
  return (
    <div className={styles.newColumn}>
      <BsPlusCircle className={styles.newColumnIcon} />
      <p className={styles.newColumnTitle}>Add column</p>
    </div>
  );
};

export default NewColumn;
