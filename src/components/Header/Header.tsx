import { ROUTES } from 'common/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import LangToggler from './LangToggler/LangToggler';
import Navigation from './Navigation/Navigation';
import ThemeToggler from './ThemeToggler/ThemeToggler';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.burger}>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
    </div>
    <div className={`${styles.container} ${styles.headerContainer}`}>
      <div className={styles.logo}>
        <Link to={ROUTES.WELCOME}>Task Manager</Link>
      </div>
      <div className={styles.actions}>
        <button className={styles.createBoardBtn}>
          <img
            className={styles.createBoardBtnImg}
            src="https://cdn.icon-icons.com/icons2/685/PNG/512/plus_icon-icons.com_61187.png"
            alt="create board img"
          />
          Create Board
        </button>
        <ThemeToggler />
        <LangToggler />
        <Navigation />
      </div>
    </div>
  </header>
);

export default Header;
