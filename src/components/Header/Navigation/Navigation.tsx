import { ROUTES } from 'common/routes';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useAppSelector } from 'hooks/redux';
import { avatars } from '../../../common/constants';
import DropDownList from '../DropDownList';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const avatarID = useAppSelector((state) => state.user.avatarID);
  const theme = useAppSelector((state) => state.user.theme);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { t } = useTranslation();

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
              <img
                className={styles.userAvatar}
                src={theme === 'dark' ? avatars[avatarID].srcL : avatars[avatarID].srcD}
                alt={t('userAvatar') || ''}
              />
            </div>
            {isMenuOpened && <div className={styles.overlay}></div>}
          </>
        ) : (
          <div className={!isAuthorised ? styles.navItemHidden : ''}>
            <li className={styles.navItem}>
              <NavLink to={ROUTES.SIGN_IN}>{t('signIn')}</NavLink>
            </li>
            <li className={styles.navSeparator}></li>
            <li className={styles.navItem}>
              <NavLink to={ROUTES.SIGN_UP}>{t('signUp')}</NavLink>
            </li>
          </div>
        )}
      </ul>
      <DropDownList setIsMenuOpened={setIsMenuOpened} isMenuOpened={isMenuOpened} />
    </nav>
  );
};

export default Navigation;
