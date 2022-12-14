import React from 'react';
import styles from './AboutTeam.module.scss';
import { ourTeams } from '../../common/constants';
import { useTranslation } from 'react-i18next';

const AboutTeam = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentWrapper}>
      <ul className={styles.teamList}>
        {ourTeams.map((item) => (
          <li
            className={styles.teamItem}
            key={item.name}
            onClick={() => (window.location.href = item.gitLink)}
          >
            <div className={styles.imageWrapper}>
              <img
                className={styles.memberImage}
                src={item.imageSrc}
                alt={t('teamMemberPhotoAlt') || ''}
              />
            </div>
            <div className={styles.textWrapper}>
              <p className={styles.memberTitle}>{item.name}</p>
              <p className={styles.memberRole}>{item.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutTeam;
