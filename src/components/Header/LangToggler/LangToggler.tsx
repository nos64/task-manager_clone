import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { setLanguage } from 'store/reducers/userSlice';
import Languages from 'types/Languages';
import styles from './LangToggler.module.scss';

interface ILangTogglerProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

const LangToggler: React.FC<ILangTogglerProps> = ({ isOpenBurger, setIsOpenBurger }) => {
  const language = useAppSelector((state) => state.user.language);
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  const handleOptionClick = (language: Languages) => {
    const userInfo = JSON.parse(localStorage.getItem(userId) || '');

    localStorage.setItem(userId, JSON.stringify({ ...userInfo, ...{ language: language } }));
    dispatch(setLanguage(language));
    if (isOpenBurger) setIsOpenBurger(false);
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
