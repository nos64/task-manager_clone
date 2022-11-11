import React from 'react';
import styles from './ThemeToggler.module.scss';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';

const ThemeToggler = () => {
  return (
    <div className={styles.themeToggler}>
      <BsSun className={styles.themeIcon} />
      <BsMoon className={styles.themeIcon} />
    </div>
  );
};

export default ThemeToggler;
