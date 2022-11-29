import React, { useState } from 'react';
import styles from './AboutApp.module.scss';
import AboutAppContent from './AboutAppContent';
import { benefitsContent } from '../../common/constants';

const AboutApp = () => {
  const [benefitsArray, setBenefitsArray] = useState(benefitsContent);

  const chooseActiveBenefit = (id: string) => {
    const modifyArray = benefitsContent.map((item) =>
      item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
    );
    setBenefitsArray(modifyArray);
  };

  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.title}>Task Manager will help you to...</h2>
      <ul className={styles.buttonList}>
        {benefitsArray.map((button) => (
          <li className={styles.buttonItem} key={button.id}>
            <button
              className={
                button.isActive ? styles.button + ' ' + styles.activeButton : styles.button
              }
              type="button"
              onClick={() => chooseActiveBenefit(button.id)}
            >
              {button.buttonText}
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
            <AboutAppContent {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutApp;
