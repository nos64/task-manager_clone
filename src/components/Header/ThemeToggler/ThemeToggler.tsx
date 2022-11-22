import React from 'react';
import styles from './ThemeToggler.module.scss';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';

const ThemeToggler = () => {
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const dispatch = useAppDispatch();

  const handleThemeClick = () => {
    if (isBurgerOpen) dispatch(setIsBurgerOpen(false));
  };

  return (
    <div className={styles.themeToggler} onClick={handleThemeClick}>
      <BsSun className={styles.themeIcon} />
      <BsMoon className={styles.themeIcon} />
    </div>
  );
};

export default ThemeToggler;
