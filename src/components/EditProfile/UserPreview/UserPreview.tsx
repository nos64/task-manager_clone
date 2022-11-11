import React from 'react';
import styles from './UserPreview.module.scss';
import { FaUserCircle } from 'react-icons/fa';

const UserPreview = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatrWrapper}>
        <FaUserCircle size={140} color={'#E1E1E1'} />
        <button className={styles.avatarButon}>ИЗМЕНИТЬ АВАТАР</button>
      </div>
      <div className={styles.nameWrapper}>
        <p className={styles.description}>
          Name: <span className={styles.value}>RegName</span>
        </p>
        <p className={styles.description}>
          Login: <span className={styles.value}>RegLogin</span>
        </p>
      </div>
    </div>
  );
};

export default UserPreview;
