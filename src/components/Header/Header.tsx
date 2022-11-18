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
import BurgerMenu from './BurgerMenu';
import BurgerContentAuth from './BurgerMenu/BurgerContentAuth';
import BurgerContentNotAuth from './BurgerMenu/BurgerContentNotAuth';

const Header = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const [topOffset, setTopOffset] = useState(0);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const offsetLimit = 15;

  const handleScroll = () => {
    setTopOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${
          topOffset > offsetLimit && isAuthorised ? styles.headerAnimated : ''
        }`}
      >
        <Container>
          <div className={`${styles.headerContent}`}>
            {/* {isAuthorised && ( */}
            <span className={!isAuthorised ? styles.burgerWrapper : ''}>
              <div
                className={isOpenBurger ? styles.burger + ' ' + styles.active : styles.burger}
                onClick={() => setIsOpenBurger(!isOpenBurger)}
              >
                <span className={styles.burgerLine}></span>
              </div>
            </span>
            {/* )} */}
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
                  <div className={styles.routToglersWrapper}>
                    <NavLink className={styles.navLink} to={ROUTES.BOARDS}>
                      Main
                    </NavLink>
                    <LangToggler />
                    <ThemeToggler />
                  </div>
                </>
              )}
              <Navigation />
            </div>
          </div>
        </Container>
      </header>
      <BurgerMenu isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger}>
        {isAuthorised ? (
          <BurgerContentAuth />
        ) : (
          <BurgerContentNotAuth setIsOpenBurger={setIsOpenBurger} />
        )}
      </BurgerMenu>
    </>
  );
};

export default Header;
