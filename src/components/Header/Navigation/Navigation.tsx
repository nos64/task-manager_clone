import { ROUTES } from 'common/routes';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useAppSelector } from 'hooks/redux';
import { avatars } from '../../../common/constants';
import DropDownList from '../DropDownList';

const Navigation = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const avatarID = useAppSelector((state) => state.user.avatarID);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleUserClick = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {isAuthorised ? (
          <>
            <div
              className={`${isMenuOpened ? styles.userDisabled : styles.user}`}
              onClick={handleUserClick}
            >
              <img className={styles.userAvatar} src={avatars[avatarID].src} alt="user avatar" />
            </div>
            {isMenuOpened && <div className={styles.overlay}></div>}
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
            </li>
            <li className={styles.navSeparator}></li>
            <li className={styles.navItem}>
              <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
      <DropDownList setIsMenuOpened={setIsMenuOpened} isMenuOpened={isMenuOpened} />
    </nav>
  );
};

export default Navigation;
