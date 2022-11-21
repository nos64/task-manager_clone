import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './BurgerContentAuth.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import LangToggler from 'components/Header/LangToggler';
import ThemeToggler from 'components/Header/ThemeToggler';
import { GoPlus } from 'react-icons/go';
import BoardModal from 'components/BoardModal';
import { noMatchesMessage } from 'common/constants';
import { setActiveBoard, setIsBurgerOpen } from 'store/reducers/boardsSlice';
import IBoard from 'types/IBoard';

const BurgerContentAuth = () => {
  const userName = useAppSelector((state) => state.user.name);
  const boards = useAppSelector((state) => state.boards.boards);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const handleBoardLinkClick = (board: IBoard) => {
    dispatch(setActiveBoard(board));
    dispatch(setIsBurgerOpen(false));
    navigate(`${ROUTES.BOARDS}/${board._id}`);
  };

  return (
    <>
      <div className={styles.menuContent}>
        <div className={styles.togglersWrapper}>
          <NavLink
            className={styles.navLink}
            to={ROUTES.BOARDS}
            onClick={() => dispatch(setIsBurgerOpen(false))}
          >
            Main
          </NavLink>
          <ThemeToggler />
          <LangToggler />
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
            filteredBoards.map(
              (board) =>
                board && (
                  <li
                    className={styles.boardItem}
                    key={board && board._id}
                    onClick={() => handleBoardLinkClick(board)}
                  >
                    {board && board.title}
                  </li>
                )
            )
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
