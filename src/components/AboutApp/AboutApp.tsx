import React, { useState } from 'react';
import styles from './AboutApp.module.scss';
import planImage from '../../assets/images/planImage.png';
import simpleImage from '../../assets/images/descriptionImage.png';
import changeImage from '../../assets/images/changeImage.png';
import dragNdropImage from '../../assets/images/dragNdropImage.png';
import AboutAppContent from './AboutAppContent';

const AboutApp = () => {
  const benefitsContent = [
    {
      id: '01',
      title: 'Plan',
      isActive: true,
      description:
        ' Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.',
      video: planImage,
    },
    {
      id: '02',
      title: 'Simplicity',
      isActive: false,
      description:
        'Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.',
      video: simpleImage,
    },
    {
      id: '03',
      title: 'Change',
      isActive: false,
      description: 'Customize your profile.',
      video: changeImage,
    },
    {
      id: '04',
      title: 'Comfortable',
      isActive: false,
      description: 'Transfer tasks and columns by drag and drop. Add an unlimited number of tasks.',
      video: dragNdropImage,
    },
  ];
  const [benefitsArray, setBenefitsArray] = useState(benefitsContent);

  const chooseActiveBenefit = (id: string) => {
    const modifyArray = benefitsContent.map((item) =>
      item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
    );
    setBenefitsArray(modifyArray);
  };

  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>Benefits of our Task Manager</h2>
      <ul className={styles.buttonList}>
        {benefitsArray.map((button) => (
          <li className={styles.bittonItem} key={button.id}>
            <button
              className={
                button.isActive ? styles.button + ' ' + styles.activeButton : styles.button
              }
              type="button"
              onClick={() => chooseActiveBenefit(button.id)}
            >
              {button.title}
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles.contentList}>
        {benefitsArray.map((item) => (
          <li
            key={item.id}
            className={
              item.isActive
                ? styles.contentItem + ' ' + styles.contentItemActive
                : styles.contentItem
            }
          >
            <AboutAppContent
              title={item.title}
              description={item.description}
              video={item.video}
              isActive={item.isActive}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutApp;
