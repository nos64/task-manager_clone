import React from 'react';
import styles from './ThemeToggler.module.scss';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';

interface IThemeTogglerProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggler: React.FC<IThemeTogglerProps> = ({ isOpenBurger, setIsOpenBurger }) => {
  const handleThemeClick = () => {
    if (isOpenBurger) setIsOpenBurger(false);
  };

  return (
    <div className={styles.themeToggler} onClick={handleThemeClick}>
      <BsSun className={styles.themeIcon} />
      <BsMoon className={styles.themeIcon} />
    </div>
  );
};

export default ThemeToggler;
