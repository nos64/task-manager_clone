import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import { scrollController } from '../../../utils/scrollController';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';
import BurgerContentAuth from './BurgerContentAuth';
import BurgerContentNotAuth from './BurgerContentNotAuth';

interface IBurgerMenuProps {
  isAuthorised: boolean;
}

const BurgerMenu: React.FC<IBurgerMenuProps> = ({ isAuthorised }) => {
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isBurgerOpen ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isBurgerOpen]);

  return (
    <div
      className={isBurgerOpen ? `${styles.overlay} ${styles.active}` : styles.overlay}
      onClick={() => dispatch(setIsBurgerOpen(!isBurgerOpen))}
    >
      <div
        className={isBurgerOpen ? `${styles.menu} ${styles.active}` : styles.menu}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={isBurgerOpen ? styles.burger + ' ' + styles.active : styles.burger}
          onClick={() => dispatch(setIsBurgerOpen(false))}
        >
          <span className={styles.burgerLine}></span>
        </div>
        {isAuthorised ? <BurgerContentAuth /> : <BurgerContentNotAuth />}
      </div>
    </div>
  );
};

export default BurgerMenu;
