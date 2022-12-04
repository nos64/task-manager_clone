import BoardModal from 'components/BoardModal';
import NewBoard from 'components/NewBoard';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IBoard from 'types/IBoard';
import Board from '../../components/Board';
import styles from './BoardsPage.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  deleteBoardById,
  getBoardsByUserId,
  setActiveBoard,
  setBoards,
} from 'store/reducers/boardsSlice';
import { setColumns } from 'store/reducers/boardSlice';
import WarningModal from 'components/WarningModal';

const BoardsPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [isModalWarningActive, setIsWarningModalActive] = useState(false);

  const boards = useAppSelector((state) => state.boards.boards);
  const userID = useAppSelector((state) => state.user.id);
  const isInexistentBoard = useAppSelector((state) => state.boards.isInexistentBoard);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (isInexistentBoard) {
      dispatch(getBoardsByUserId(userID));
      setIsWarningModalActive(false);
    }
  }, [dispatch, isInexistentBoard, userID]);

  useEffect(() => {
    dispatch(setActiveBoard(null));
    dispatch(setColumns([]));
    dispatch(setBoards([]));
  }, [dispatch]);

  useEffect(() => {
    userID && dispatch(getBoardsByUserId(userID));
  }, [dispatch, userID]);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoardById(selectedBoard?._id || ''));
    setIsWarningModalActive(false);
  };

  return (
    <div className={styles.pageContent}>
      <h3 className={styles.title}>{t('boards')}</h3>
      <div className={styles.boardsContainer}>
        {boards &&
          boards.map((board) => (
            <Board
              key={board._id}
              item={board}
              toggleModal={toggleModal}
              setModalMode={setModalMode}
              setSelectedBoard={setSelectedBoard}
              setIsWarningModalActive={setIsWarningModalActive}
            />
          ))}
        <NewBoard
          toggleModal={toggleModal}
          setModalMode={setModalMode}
          setSelectedBoard={setSelectedBoard}
        />
      </div>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={modalMode}
        selectedBoard={selectedBoard}
      />
      <WarningModal
        deleteBtnHandler={handleDeleteBoard}
        cancelBtnHandler={() => setIsWarningModalActive(false)}
        message={t('deleteBoardMessage')}
        isModalActive={isModalWarningActive}
      />
    </div>
  );
};

export default BoardsPage;
