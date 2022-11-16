import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import { useAppSelector } from 'hooks/redux';
import { NavLink } from 'react-router-dom';
import { scrollController } from '../../../utils/scrollController';
interface IBurgerMenuProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}
const BurgerMenu: React.FC<IBurgerMenuProps> = ({ isOpenBurger, setIsOpenBurger }) => {
  const userName = useAppSelector((state) => state.user.name);

  useEffect(() => {
    isOpenBurger ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isOpenBurger]);

  const boards = [
    {
      _id: '1',
      title: 'Board 11111111111111111111111111111111 1111111111111111111111111111111111111111',
      description:
        'board description 11111111111111111111111111111111 1111111111111111111111111111111111111111',
    },
    { _id: '2', title: 'Board 2', description: 'board description 2' },
    { _id: '3', title: 'Board 3', description: 'board description 3' },
    { _id: '4', title: 'Board 4', description: 'board description 4' },
    { _id: '5', title: 'Board 5', description: 'board description 5' },
    { _id: '6', title: 'Board 6', description: 'board description 6' },
    { _id: '7', title: 'Board 7', description: 'board description 7' },
  ];

  return (
    <>
      <div className={isOpenBurger ? `${styles.overlay} ${styles.active}` : styles.overlay}></div>
      <div
        className={isOpenBurger ? `${styles.menu} ${styles.active}` : styles.menu}
        onClick={() => setIsOpenBurger(false)}
      >
        <div className={styles.menuContent} onClick={(e) => e.stopPropagation()}>
          <div
            className={isOpenBurger ? styles.burger + ' ' + styles.active : styles.burger}
            onClick={() => setIsOpenBurger(!isOpenBurger)}
          >
            <span className={styles.burgerLine}></span>
          </div>
          <div className={styles.menuHeader}>
            <h2>{userName}</h2>
          </div>
          <div className={styles.borderListTitle}>My Boards</div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputLine}
              type="search"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
          <ul className={styles.boardList}>
            {boards.map((board) => (
              <li className={styles.boardItem} key={board._id}>
                <NavLink className={styles.navLink} to={'#'}>
                  {board.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
