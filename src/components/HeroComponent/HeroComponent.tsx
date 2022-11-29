import { ROUTES } from 'common/routes';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeroComponent.module.scss';
import heroImageDark from '../../assets/images/board-dark.webp';
import heroImageLight from '../../assets/images/board-light.webp';
import { useTranslation } from 'react-i18next';

const HeroComponent = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const theme = useAppSelector((state) => state.user.theme);

  const { t } = useTranslation();

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t('heroTitle')}</h2>
        <p className={styles.subtitle}>
          <strong>Task Manager</strong>
          {t('heroMessage')}
        </p>
        <div className={styles.navButtons}>
          <ul className={styles.navList}>
            {!isAuthorised ? (
              <>
                <li>
                  <NavLink className={styles.navLink} to={ROUTES.SIGN_IN}>
                    {t('signIn')}
                  </NavLink>
                </li>
                <li className={styles.navSeparator}></li>
                <li>
                  <NavLink className={styles.navLinkAlt} to={ROUTES.SIGN_UP}>
                    {t('signUp')}
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink className={styles.navLink} to={ROUTES.BOARDS}>
                  {t('main')}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={theme === 'dark' ? heroImageDark : heroImageLight}
          alt="Hero Image"
          width="700px"
        />
      </div>
    </section>
  );
};

export default HeroComponent;
