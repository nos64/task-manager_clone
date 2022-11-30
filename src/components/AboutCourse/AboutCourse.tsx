import AboutTeam from 'components/AboutTeam';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutCourse.module.scss';

const AboutCourse = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>{t('aboutUs')}</h2>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <p className={styles.aboutText}>{t('aboutTeam')}</p>
          <p className={styles.aboutText}>{t('aboutCourse')}</p>
        </div>
        <AboutTeam />
      </div>
    </section>
  );
};

export default AboutCourse;
