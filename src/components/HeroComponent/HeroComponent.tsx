import { ROUTES } from 'common/routes';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeroComponent.module.scss';
import heroImage from '../../assets/images/heroImage.png';

const HeroComponent = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>Unite your team</h2>
        <p className={styles.subtitle}>
          <strong>Task Manager</strong> - the easy way to organize, plan and track progress on your
          projects.
        </p>
        <div className={styles.navButtons}>
          <ul className={styles.navList}>
            {!isAuthorised ? (
              <>
                <li className={styles.navItem}>
                  <NavLink to={ROUTES.SIGN_IN}>Sign in</NavLink>
                </li>
                <li className={styles.navSeparator}></li>
                <li className={styles.navItem}>
                  <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
                </li>
              </>
            ) : (
              <li className={styles.navItem}>
                <NavLink to={ROUTES.BOARDS}>Main</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.heroImage} src={heroImage} alt="Hero Image" width="700px" />
      </div>
    </section>
  );
};

export default HeroComponent;
