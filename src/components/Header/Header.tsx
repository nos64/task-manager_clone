import { ROUTES } from 'common/routes';
import Container from 'components/Container';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import LangToggler from './LangToggler';
import Navigation from './Navigation';
import ThemeToggler from './ThemeToggler';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.burger}>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
      <span className={styles.burgerLine}></span>
    </div>
    <Container>
      <div className={`${styles.headerContent}`}>
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
    </Container>
  </header>
);

export default Header;
