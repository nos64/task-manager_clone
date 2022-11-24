import { useAppDispatch, useAppSelector } from 'hooks/redux';
import i18n from 'i18next';
import React, { useEffect } from 'react';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';
import { setLanguage } from 'store/reducers/userSlice';
import Languages from 'types/Languages';
import styles from './LangToggler.module.scss';

const LangToggler = () => {
  const language = useAppSelector((state) => state.user.language);
  const userId = useAppSelector((state) => state.user.id);
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const dispatch = useAppDispatch();

  const handleOptionClick = (language: Languages) => {
    const userInfo = JSON.parse(localStorage.getItem(userId) || '');

    localStorage.setItem(userId, JSON.stringify({ ...userInfo, ...{ language: language } }));
    dispatch(setLanguage(language));
    if (isBurgerOpen) dispatch(setIsBurgerOpen(false));
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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
