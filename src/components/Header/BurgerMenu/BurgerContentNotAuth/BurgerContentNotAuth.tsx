import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerContentNotAuth.module.scss';
import { useAppSelector } from 'hooks/redux';

const BurgerContentNotAuth = () => {
  return (
    <div className={styles.menuContent}>
      <div className={styles.menuHeader}>
        <h2>Please Registry</h2>
      </div>
    </div>
  );
};

export default BurgerContentNotAuth;
