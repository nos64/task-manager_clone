import AboutTeam from 'components/AboutTeam';
import React from 'react';
import styles from './AboutCourse.module.scss';

const AboutCourse = () => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>About us</h2>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <p className={styles.aboutText}>
            Our team is a united group of students of the Rolling Scopes School and this application
            represents a solution for the React.JS course task. The goal of this course is to gain
            knowledge and experience in work with React library, share best coding practice and give
            an experience of teamwork.
          </p>
          <p className={styles.aboutText}>
            RS School is free-of-charge and community-based education program conducted by The
            Rolling Scopes developer community and based on Open Source philosophy and &apos;Teach
            It Forward&apos; principle. Everyone can study at RS School, regardless of age,
            professional employment, or place of residence.The mentors and trainers of this school
            are front-end and javascript developers from different companies and countries.
          </p>
        </div>
        <AboutTeam />
      </div>
    </section>
  );
};

export default AboutCourse;
