import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerContentNotAuth.module.scss';
import { ROUTES } from 'common/routes';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';

const BurgerContentNotAuth = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <div className={styles.menuContent}>
      <ul className={styles.navList}>
        <li className={styles.navItem} onClick={() => dispatch(setIsBurgerOpen(false))}>
          <NavLink to={ROUTES.SIGN_IN}>{t('signIn')}</NavLink>
        </li>
        <li className={styles.navSeparator}></li>
        <li className={styles.navItem}>
          <NavLink to={ROUTES.SIGN_UP} onClick={() => dispatch(setIsBurgerOpen(false))}>
            {t('signUp')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default BurgerContentNotAuth;
