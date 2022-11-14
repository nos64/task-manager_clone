import { ROUTES } from 'common/routes';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import userAvatar from './../../../assets/images/user.png';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsAuthorised } from 'store/reducers/userSlice';

const Navigation = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => {
    dispatch(setIsAuthorised(false));
    localStorage.removeItem('token');

    setIsMenuOpened(false);
  };

  return (
    <nav
      className={`${styles.nav} ${isAuthorised ? styles.authorized : ''} ${
        isMenuOpened ? styles.opened : ''
      }`}
    >
      <div className={styles.user} onClick={() => setIsMenuOpened(!isMenuOpened)}>
        <img className={styles.userAvatar} src={userAvatar} alt="user avatar" />
        <p className={styles.userName}>{userName}</p>
      </div>
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
          <NavLink className={styles.navLink} to={ROUTES.WELCOME} onClick={handleSignOutClick}>
            Sign out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
