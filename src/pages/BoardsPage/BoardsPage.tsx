import BoardModal from 'components/BoardModal';
import NewBoard from 'components/NewBoard';
import React, { useState } from 'react';
import Board from '../../components/Board';
import styles from './BoardsPage.module.scss';
import { useAppSelector } from 'hooks/redux';

const BoardsPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const boards = useAppSelector((state) => state.boards.boards);
  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  // const boards = [
  //   {
  //     _id: '1',
  //     title: 'Board 111111111111111111111111111111111',
  //     description:
  //       'board description 11111111111111111111111111111111 1111111111111111111111111111111111111111',
  //   },
  //   { _id: '2', title: 'Board 2', description: 'board description 2' },
  //   { _id: '3', title: 'Board 3', description: 'board description 3' },
  //   { _id: '4', title: 'Board 4', description: 'board description 4' },
  //   { _id: '5', title: 'Board 5', description: 'board description 5' },
  //   { _id: '6', title: 'Board 6', description: 'board description 6' },
  //   { _id: '7', title: 'Board 7', description: 'board description 7' },
  // ];

  return (
    <div className={styles.pageContent}>
      <h3 className={styles.title}>Boards</h3>
      <div className={styles.boardsContainer}>
        {boards.map((board) => {
          return <Board key={board._id} item={board} />;
        })}
        <NewBoard toggleModal={toggleModal} />
      </div>
      {isModalOpened && (
        <BoardModal modalActive={isModalOpened} setModalActive={setIsModalOpened} />
      )}
    </div>
  );
};

export default BoardsPage;
