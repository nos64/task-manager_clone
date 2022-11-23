import React from 'react';
import styles from './AboutApp.module.scss';
import planImage from '../../assets/images/planImage.png';
import descriptionImage from '../../assets/images/descriptionImage.png';
import changeImage from '../../assets/images/changeImage.png';
const AboutApp = () => {
  return (
    <div className={styles.contentWrapper}>
      <section className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={planImage} alt="Plan Image" width="700px" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Plan</h2>
          <p className={styles.subtitle}>
            Break the big ideas down into manageable chunks across teams with user stories, issues,
            and tasks.
          </p>
        </div>
      </section>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Simplicity</h2>
          <p className={styles.subtitle}>
            CreateBoards, add description, distribute tasks among team members.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={descriptionImage}
            alt="Description Image"
            width="700px"
          />
        </div>
      </section>
      <section className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={changeImage} alt="Change Image" width="700px" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Change</h2>
          <p className={styles.subtitle}>Customize your profile.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutApp;
