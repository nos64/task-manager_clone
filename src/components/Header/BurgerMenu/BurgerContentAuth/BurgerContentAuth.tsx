import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './BurgerContentAuth.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import LangToggler from 'components/Header/LangToggler';
import ThemeToggler from 'components/Header/ThemeToggler';
import { GoPlus } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import BoardModal from 'components/BoardModal';
import {
  getBoardsByUserId,
  setActiveBoard,
  setBoards,
  setIsBurgerOpen,
} from 'store/reducers/boardsSlice';
import IBoard from 'types/IBoard';
import TaskSearchModal from 'components/TaskSearchModal';
import useDebounce from 'hooks/useDebouce';

const BurgerContentAuth = () => {
  const userName = useAppSelector((state) => state.user.name);
  const boards = useAppSelector((state) => state.boards.boards);
  const userID = useAppSelector((state) => state.user.id);
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [enteredSearchValue, setEnteredSearchValue] = useState('');
  const [isFindTaskModalOpened, setIsFindTaskModalOpened] = useState(false);

  const activeSearchValue = useDebounce(enteredSearchValue);

  const { t } = useTranslation();

  const filteredBoards = boards.filter((board) =>
    board?.title.toLowerCase().trim().includes(activeSearchValue.toLowerCase().trim())
  );

  useEffect(() => {
    if (isBurgerOpen) {
      dispatch(setBoards([]));
      userID && dispatch(getBoardsByUserId(userID));
    }
  }, [dispatch, userID, isBurgerOpen]);

  useEffect(() => {
    if (isBurgerOpen) {
      setEnteredSearchValue('');
    }
  }, [isBurgerOpen]);

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
            {t('main')}
          </NavLink>
          <ThemeToggler />
          <LangToggler />
        </div>
        <div className={styles.menuHeader}>
          <h2>{userName}</h2>
        </div>
        <div className={styles.boardListTitle}>{t('myBoards')}</div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputLine}
            type="search"
            placeholder={t('searchFieldPlaceholder') || ''}
            autoComplete="off"
            onChange={(e) => setEnteredSearchValue(e.target.value)}
            value={enteredSearchValue}
          />
        </div>
        {boards.length !== 0 ? (
          <ul className={styles.boardList}>
            {filteredBoards.length ? (
              filteredBoards.map((board) => (
                <li
                  className={styles.boardItem}
                  key={board && board._id}
                  onClick={() => handleBoardLinkClick(board)}
                >
                  <span className={styles.boardNavLink}>{board.title}</span>
                </li>
              ))
            ) : (
              <>
                <p className={styles.noMatchesMessage}>{t('noMatchesMessage')}</p>
                <p className={styles.noMatchesValue}>{enteredSearchValue}</p>
              </>
            )}
          </ul>
        ) : (
          <p className={styles.noMatchesMessage}>{t('noBoardsmessage')}</p>
        )}
        <div className={styles.btnsWrapper}>
          <button className={styles.createBoardBtn} type="button" onClick={handleCreateBoard}>
            <GoPlus />
            {t('createBoard')}
          </button>
          <button
            className={styles.createBoardBtn}
            type="button"
            onClick={() => setIsFindTaskModalOpened(true)}
          >
            <FiSearch />
            {t('findTask')}
          </button>
        </div>
      </div>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={'create'}
        selectedBoard={null}
      />
      <TaskSearchModal
        modalActive={isFindTaskModalOpened}
        setModalActive={setIsFindTaskModalOpened}
      />
    </>
  );
};

export default BurgerContentAuth;
