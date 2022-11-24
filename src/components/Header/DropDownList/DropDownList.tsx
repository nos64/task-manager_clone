import { ROUTES } from 'common/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { setIsAuthorised } from 'store/reducers/userSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './DropDownList.module.scss';
import { setActiveBoard, setBoards } from 'store/reducers/boardsSlice';
import { useTranslation } from 'react-i18next';

interface DropDownListProps {
  setIsMenuOpened: (value: React.SetStateAction<boolean>) => void;
  isMenuOpened: boolean;
}

const DropDownList: React.FC<DropDownListProps> = ({ setIsMenuOpened, isMenuOpened }) => {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleSignOutClick = () => {
    dispatch(setIsAuthorised(false));
    dispatch(setBoards([]));
    dispatch(setActiveBoard(null));
    localStorage.removeItem('token');

    setIsMenuOpened(false);
  };

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  return (
    <OutsideClickHandler disabled={!isMenuOpened} onOutsideClick={closeMenu}>
      <ul className={`${isMenuOpened ? styles.dropDownList : styles.dropDownListDisabled}`}>
        <p className={styles.userName}>{userName}</p>
        <li>
          <NavLink className={styles.navLink} to={ROUTES.PROFILE} onClick={closeMenu}>
            {t('editProfile')}
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to={ROUTES.WELCOME} onClick={handleSignOutClick}>
            {t('signOut')}
          </NavLink>
        </li>
      </ul>
    </OutsideClickHandler>
  );
};

export default DropDownList;
