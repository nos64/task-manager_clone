import { ROUTES } from 'common/routes';
import Container from 'components/Container';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import LangToggler from './LangToggler';
import Navigation from './Navigation';
import ThemeToggler from './ThemeToggler';
import { GoPlus } from 'react-icons/go';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import BurgerMenu from './BurgerMenu';
import BurgerContentAuth from './BurgerMenu/BurgerContentAuth';
import BurgerContentNotAuth from './BurgerMenu/BurgerContentNotAuth';
import { useTranslation } from 'react-i18next';
import BoardModal from 'components/BoardModal';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const [topOffset, setTopOffset] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { t } = useTranslation();

  const offsetLimit = 15;
  const handleScroll = () => {
    setTopOffset(window.scrollY);
  };
  const handleCreateBoard = () => {
    setIsModalOpened(true);
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
          <div className={styles.headerContent}>
            <span className={!isAuthorised ? styles.burgerWrapper : ''}>
              <div
                className={isBurgerOpen ? styles.burger + ' ' + styles.active : styles.burger}
                onClick={() => dispatch(setIsBurgerOpen(!isBurgerOpen))}
              >
                <span className={styles.burgerLine}></span>
              </div>
            </span>
            <div className={styles.logo}>
              <Link to={ROUTES.WELCOME}>Task Manager</Link>
            </div>
            <div className={styles.actions}>
              {isAuthorised && (
                <>
                  <button
                    className={styles.createBoardBtn}
                    type="button"
                    onClick={handleCreateBoard}
                  >
                    <GoPlus />
                    {t('createBoard')}
                  </button>
                  <div className={styles.routToglersWrapper}>
                    <NavLink className={styles.navLink} to={ROUTES.BOARDS}>
                      {t('main')}
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
      <BurgerMenu>{isAuthorised ? <BurgerContentAuth /> : <BurgerContentNotAuth />}</BurgerMenu>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={'create'}
        selectedBoard={null}
      />
    </>
  );
};

export default Header;
