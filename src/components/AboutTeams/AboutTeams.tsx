import React from 'react';
import styles from './AboutTeams.module.scss';
import { ourTeams } from '../../common/constants';

const AboutTeams = () => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>Our Teams</h2>
      <ul className={styles.teamList}>
        {ourTeams.map((item) => (
          <li className={styles.teamItem} key={item.name}>
            <div className={styles.imageWrapper}>
              <img className={styles.memberImage} src={item.imageSrc} alt="Photo" />
            </div>
            <div className={styles.textWrapper}>
              <a className={styles.memberTitle} href={item.gitLink}>
                {item.name}
              </a>
              <p className={styles.memberRole}>{item.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutTeams;
