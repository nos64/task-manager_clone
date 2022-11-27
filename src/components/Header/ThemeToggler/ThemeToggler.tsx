import React from 'react';
import styles from './ThemeToggler.module.scss';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';
import { setTheme } from 'store/reducers/userSlice';
import Themes from 'types/Theme';

const ThemeToggler = () => {
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const theme = useAppSelector((state) => state.user.theme);
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  const handleThemeClick = (theme: Themes) => {
    const userInfo = JSON.parse(localStorage.getItem(userId) || '');

    localStorage.setItem(userId, JSON.stringify({ ...userInfo, ...{ theme: theme } }));
    dispatch(setTheme(theme));

    if (isBurgerOpen) dispatch(setIsBurgerOpen(false));

    // const next = theme === 'dark' ? 'light' : 'dark';
    // dispatch(setTheme(next));
    // if (isBurgerOpen) dispatch(setIsBurgerOpen(false));
  };

  return (
    <div
      className={styles.themeToggler}
      onClick={() => handleThemeClick(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <>
          <BsMoon className={styles.themeIcon} />
          <BsSun className={styles.themeIcon} />
        </>
      ) : (
        <>
          <BsSun className={styles.themeIcon} />
          <BsMoon className={styles.themeIcon} />
        </>
      )}
    </div>
  );
};

export default ThemeToggler;
