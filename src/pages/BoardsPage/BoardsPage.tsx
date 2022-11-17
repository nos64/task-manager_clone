import NewBoard from 'components/NewBoard';
import React from 'react';
import Board from './Board';
import styles from './BoardsPage.module.scss';

const BoardsPage = () => {
  const boards = [
    {
      _id: '1',
      title: 'Board 111111111111111111111111111111111',
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
    <div className={styles.pageContent}>
      <h3 className={styles.title}>Boards</h3>
      <div className={styles.boardsContainer}>
        {boards.map((board) => {
          return <Board key={board._id} item={board} />;
        })}
        <NewBoard />
      </div>
    </div>
  );
};

export default BoardsPage;
