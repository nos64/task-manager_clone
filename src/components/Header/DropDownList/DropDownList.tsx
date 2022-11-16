import { ROUTES } from 'common/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { setIsAuthorised } from 'store/reducers/userSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './DropDownList.module.scss';

interface DropDownListProps {
  setIsMenuOpened: (value: React.SetStateAction<boolean>) => void;
  isMenuOpened: boolean;
}

const DropDownList: React.FC<DropDownListProps> = ({ setIsMenuOpened, isMenuOpened }) => {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => {
    dispatch(setIsAuthorised(false));
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
            Edit profile
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.navLink} to={ROUTES.WELCOME} onClick={handleSignOutClick}>
            Sign out
          </NavLink>
        </li>
      </ul>
    </OutsideClickHandler>
  );
};

export default DropDownList;
