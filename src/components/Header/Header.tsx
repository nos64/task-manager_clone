import { ROUTES } from 'common/routes';
import Container from 'components/Container';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import LangToggler from './LangToggler';
import Navigation from './Navigation';
import ThemeToggler from './ThemeToggler';
import { GoPlus } from 'react-icons/go';
import BurgerMenu from './BurgerMenu';

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={`${styles.headerContent}`}>
            <div
              className={isOpenBurger ? styles.burger + ' ' + styles.active : styles.burger}
              onClick={() => setIsOpenBurger(!isOpenBurger)}
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
              <Navigation />
              <div className={styles.themeLangWrapper}>
                <ThemeToggler />
                <LangToggler />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <BurgerMenu isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
    </>
  );
};

export default Header;
