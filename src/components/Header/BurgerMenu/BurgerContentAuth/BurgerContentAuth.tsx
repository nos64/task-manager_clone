import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerContentAuth.module.scss';
import { useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import LangToggler from 'components/Header/LangToggler';
import ThemeToggler from 'components/Header/ThemeToggler';
import { GoPlus } from 'react-icons/go';
import BoardModal from 'components/BoardModal';
import { noMatchesMessage } from 'common/constants';

interface IBurgerContentAuthProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerContentAuth: React.FC<IBurgerContentAuthProps> = ({
  isOpenBurger,
  setIsOpenBurger,
}) => {
  const userName = useAppSelector((state) => state.user.name);
  const boards = useAppSelector((state) => state.boards.boards);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [enteredSearchValue, setEnteredSearchValue] = useState('');
  const [activeSearchValue, setActiveSearchValue] = useState('');
  const [visibleBoards, setVisibleBoards] = useState(
    useAppSelector((state) => state.boards.boards)
  );

  useEffect(() => {
    setVisibleBoards(boards);
  }, []);

  const filteredBoards = boards.filter((board) =>
    board?.title.toLowerCase().trim().includes(activeSearchValue.toLowerCase().trim())
  );
  useEffect(() => {
    const handler = setTimeout(() => {
      setActiveSearchValue(enteredSearchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [enteredSearchValue]);

  const handleCreateBoard = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      <div className={styles.menuContent}>
        <div className={styles.togglersWrapper}>
          <NavLink
            className={styles.navLink}
            to={ROUTES.BOARDS}
            onClick={() => setIsOpenBurger(false)}
          >
            Main
          </NavLink>
          <ThemeToggler isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
          <LangToggler isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
        </div>

        <div className={styles.menuHeader}>
          <h2>{userName}</h2>
        </div>
        <div className={styles.boardListTitle}>My Boards</div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputLine}
            type="search"
            placeholder="Please enter board name"
            autoComplete="off"
            onChange={(e) => setEnteredSearchValue(e.target.value)}
            value={enteredSearchValue}
          />
        </div>
        <button className={styles.createBoardBtn} type="button" onClick={handleCreateBoard}>
          <GoPlus />
          Create Board
        </button>
        <ul className={styles.boardList}>
          {filteredBoards.length ? (
            filteredBoards.map((board) => (
              <li
                className={styles.boardItem}
                key={board && board._id}
                onClick={() => setIsOpenBurger(false)}
              >
                <NavLink className={styles.boardNavLink} to={`${ROUTES.BOARDS}/${board?._id}`}>
                  {board && board.title}
                </NavLink>
              </li>
            ))
          ) : (
            <>
              <p className={styles.noMatchesMessage}>{noMatchesMessage}</p>
              <p className={styles.noMatchesValue}>{enteredSearchValue}</p>
            </>
          )}
        </ul>
      </div>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={'create'}
        selectedBoard={null}
      />
    </>
  );
};

export default BurgerContentAuth;
