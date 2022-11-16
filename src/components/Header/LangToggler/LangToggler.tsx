import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { setLanguage } from 'store/reducers/userSlice';
import Languages from 'types/Languages';
import styles from './LangToggler.module.scss';

const LangToggler = () => {
  const language = useAppSelector((state) => state.user.language);
  const dispatch = useAppDispatch();

  const handleOptionClick = (language: Languages) => {
    dispatch(setLanguage(language));
  };

  return (
    <div className={styles.langToggler}>
      <div className={styles.preview}>{language}</div>
      <ul className={styles.langTogglerContent}>
        <li className={styles.option} onClick={() => handleOptionClick('EN')}>
          EN
        </li>
        <li className={styles.option} onClick={() => handleOptionClick('RU')}>
          RU
        </li>
      </ul>
    </div>
  );
};

export default LangToggler;
