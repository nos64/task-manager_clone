import React from 'react';
import styles from './AboutAppContent.module.scss';

interface IAboutAppContentProps {
  title: string;
  description: string;
  video: string;
  isActive: boolean;
}
const AboutAppContent: React.FC<IAboutAppContentProps> = ({
  title,
  description,
  video,
  isActive,
}) => {
  return (
    <section className={isActive ? styles.wrapper + ' ' + styles.activeWrapper : styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{description}</p>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={video} alt="Description Image" width="700px" />
      </div>
    </section>
  );
};

export default AboutAppContent;
