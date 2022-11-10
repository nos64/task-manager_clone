import React from 'react';
import styles from './ThemeToggler.module.scss';

const ThemeToggler = () => {
  return (
    <div className={styles.themeToggler}>
      <img
        className={styles.themeImg}
        src="https://cdn.icon-icons.com/icons2/1919/PNG/512/lightbulbon_121975.png"
        alt="theme toggle btn"
      />
    </div>
  );
};

export default ThemeToggler;
