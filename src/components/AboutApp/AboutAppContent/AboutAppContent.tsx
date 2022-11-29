import React from 'react';
import styles from './AboutAppContent.module.scss';

interface IAboutAppContentProps {
  title: string;
  description: string;
  video: string;
}
const AboutAppContent: React.FC<IAboutAppContentProps> = ({ title, description, video }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{description}</p>
      </div>
      <div className={styles.videoWrapper}>
        <video
          className={styles.benefitVideo}
          width="750"
          height="auto"
          autoPlay
          playsInline
          loop
          muted
          src={video}
        />
      </div>
    </section>
  );
};

export default AboutAppContent;
