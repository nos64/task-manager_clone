import React from 'react';
import styles from './UserPreview.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { useAppSelector } from 'hooks/redux';

const UserPreview = () => {
  const name = useAppSelector((state) => state.user.name);
  const login = useAppSelector((state) => state.user.login);

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatrWrapper}>
        <FaUserCircle size={140} color={'#E1E1E1'} />
        <button className={styles.avatarButon}>Change avatar</button>
      </div>
      <div className={styles.nameWrapper}>
        <p className={styles.description}>
          Name: <span className={styles.value}>{name}</span>
        </p>
        <p className={styles.description}>
          Login: <span className={styles.value}>{login}</span>
        </p>
      </div>
    </div>
  );
};

export default UserPreview;
