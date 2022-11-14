import { ROUTES } from 'common/routes';
import Container from 'components/Container';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import LangToggler from './LangToggler';
import Navigation from './Navigation';
import ThemeToggler from './ThemeToggler';
import { GoPlus } from 'react-icons/go';

const Header = () => {
  const [openBurger, setOpenBurger] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={`${styles.headerContent}`}>
          <div
            className={openBurger ? styles.burger + ' ' + styles.active : styles.burger}
            onClick={() => setOpenBurger(!openBurger)}
          >
            <span className={styles.burgerLine}></span>
          </div>
          <div className={styles.logo}>
            <Link to={ROUTES.WELCOME}>Task Manager</Link>
          </div>
          <div className={styles.actions}>
            <button className={styles.createBoardBtn}>
              <GoPlus />
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
};

export default Header;
