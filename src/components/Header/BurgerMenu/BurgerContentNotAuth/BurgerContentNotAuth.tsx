import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerContentNotAuth.module.scss';
import { ROUTES } from 'common/routes';

interface IBurgerContentNotAuthProps {
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerContentNotAuth: React.FC<IBurgerContentNotAuthProps> = ({ setIsOpenBurger }) => {
  return (
    <div className={styles.menuContent}>
      <ul className={styles.navList}>
        <li className={styles.navItem} onClick={() => setIsOpenBurger(false)}>
          <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
        </li>
        <li className={styles.navSeparator}></li>
        <li className={styles.navItem}>
          <NavLink to={ROUTES.SIGN_UP} onClick={() => setIsOpenBurger(false)}>
            Sign up
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default BurgerContentNotAuth;
