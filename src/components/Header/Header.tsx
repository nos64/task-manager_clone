import { ROUTES } from 'common/routes';
import Container from 'components/Container';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import LangToggler from './LangToggler';
import Navigation from './Navigation';
import ThemeToggler from './ThemeToggler';
import { GoPlus } from 'react-icons/go';
import { useAppSelector } from 'hooks/redux';

const Header = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const [topOffset, setTopOffset] = useState(0);

  const offsetLimit = 15;

  const handleScroll = () => {
    setTopOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${topOffset > offsetLimit ? styles.headerAnimated : ''}`}>
      <Container>
        <div className={`${styles.headerContent}`}>
          <div className={styles.burger}>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>
          <div className={styles.logo}>
            <Link to={ROUTES.WELCOME}>Task Manager</Link>
          </div>

          <div className={styles.actions}>
            {isAuthorised && (
              <>
                <button className={styles.createBoardBtn} type="button">
                  <GoPlus />
                  Create Board
                </button>
                <NavLink className={styles.navLink} to={ROUTES.BOARDS}>
                  Main
                </NavLink>
              </>
            )}
            <LangToggler />
            <ThemeToggler />
            <Navigation />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
