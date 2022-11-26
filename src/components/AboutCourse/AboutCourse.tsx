import React from 'react';
import styles from './AboutCourse.module.scss';
import rssImg from './../../assets/images/rs_school_js.svg';

const AboutCourse = () => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>About Us</h2>
      <p className={styles.aboutText}>
        This application is the result of the collaboration of a team of developers, students of the
        &quot;React 2022 Q3 group of the React Development course&quot; Rollong Scopes School.
      </p>
      <div className={styles.aboutRSText}>
        <span>
          <a href="https://rs.school/index.html" className={styles.courswLink}>
            <img className={styles.courseImg} src={rssImg} alt="course img" />
          </a>
          <span>
            is free-of-charge and community-based education program conducted by The Rolling Scopes
            developer community since 2013.
          </span>
        </span>
        <p className={styles.aboutSchoolText}>
          Everyone can study at RS School, regardless of age, professional employment, or place of
          residence.
        </p>
        <p className={styles.aboutSchoolText}>
          The mentors and trainers of RS school are front-end and javascript developers from
          different companies and countries.
        </p>
      </div>
    </section>
  );
};

export default AboutCourse;
