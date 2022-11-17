import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import { scrollController } from '../../../utils/scrollController';

interface IBurgerMenuProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
const BurgerMenu: React.FC<IBurgerMenuProps> = ({ isOpenBurger, setIsOpenBurger, children }) => {
  useEffect(() => {
    isOpenBurger ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isOpenBurger]);

  return (
    <div
      className={isOpenBurger ? `${styles.overlay} ${styles.active}` : styles.overlay}
      onClick={() => setIsOpenBurger(!isOpenBurger)}
    >
      <div
        className={isOpenBurger ? `${styles.menu} ${styles.active}` : styles.menu}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={isOpenBurger ? styles.burger + ' ' + styles.active : styles.burger}
          onClick={() => setIsOpenBurger(false)}
        >
          <span className={styles.burgerLine}></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BurgerMenu;
