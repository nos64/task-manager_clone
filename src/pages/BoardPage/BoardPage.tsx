import { ROUTES } from 'common/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Column from './Column/Column';
import { FaLessThan } from 'react-icons/fa';
import NewColumn from './NewColumn/NewColumn';
import ITask from 'types/ITask';

const BoardPage = () => {
  const boardTitle = 'board title';
  const boardDescription = 'Booard description';
  const tasks: Partial<ITask>[][] = [
    [
      { _id: '1', title: 'task 1', users: ['user1'] },
      { _id: '2', title: 'task 2' },
    ],
    [
      { _id: '3', title: 'task 1' },
      { _id: '4', title: 'task 2', users: ['user2'] },
      { _id: '5', title: 'task 3' },
    ],
  ];
  const columns = [
    { id: 1, title: 'Column Name 1', order: 2, color: '#8d7cee', tasks: tasks[0] },
    { id: 2, title: 'Column Name 2', order: 1, color: '#306ee8', tasks: tasks[1] },
  ];
  const sortedColumns = columns.sort((col1, col2) => (col1.order < col2.order ? -1 : 1));

  return (
    <div className={styles.pageContent}>
      <div className={styles.topBlock}>
        <Link className={styles.backBtn} to={ROUTES.BOARDS}>
          <FaLessThan className={styles.backBtnIcon} />
          <span>Back</span>
        </Link>
        <div className={styles.boardInfo}>
          <h3 className={styles.title}>{`Board: ${boardTitle}`}</h3>
          <p className={styles.description}>{boardDescription}</p>
        </div>
      </div>
      <div className={styles.columnsContainer}>
        {sortedColumns.map((column) => {
          return (
            <Column
              key={column.id}
              title={column.title}
              color={column.color}
              tasks={column.tasks}
            />
          );
        })}
        <NewColumn />
      </div>
    </div>
  );
};

export default BoardPage;
