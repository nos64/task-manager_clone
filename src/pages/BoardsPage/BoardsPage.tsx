import BoardModal from 'components/BoardModal';
import NewBoard from 'components/NewBoard';
import React, { useEffect, useState } from 'react';
import IBoard from 'types/IBoard';
import Board from '../../components/Board';
import styles from './BoardsPage.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getBoardsByUserId } from 'store/reducers/boardsSlice';

const BoardsPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const userID = useAppSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(getBoardsByUserId(userID));
  }, [dispatch, userID]);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  return (
    <div className={styles.pageContent}>
      <h3 className={styles.title}>Boards</h3>
      <div className={styles.boardsContainer}>
        {boards.map((board) => {
          if (board) {
            return (
              <Board
                key={board._id}
                item={board}
                toggleModal={toggleModal}
                setModalMode={setModalMode}
                setSelectedBoard={setSelectedBoard}
              />
            );
          }
        })}
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
    </div>
  );
};

export default BoardsPage;
