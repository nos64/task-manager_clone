import { ROUTES } from 'common/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.scss';

const Navigation = () => {
  return (
    <nav className="nav">
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to={ROUTES.SIGN_IN}>
            Sign in
          </NavLink>
        </li>
        <li className={styles.navSeparator}></li>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to={ROUTES.SIGN_UP}>
            Sign up
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to={ROUTES.PROFILE}>
            Edit profile
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to={ROUTES.WELCOME}>
            Sign out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
