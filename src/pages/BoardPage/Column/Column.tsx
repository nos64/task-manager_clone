import React from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task/Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';

type ColumnProps = {
  title: string;
  color: string;
  tasks: Partial<ITask>[];
};

const Column: React.FC<ColumnProps> = ({ title, color, tasks }) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <RiDeleteBin6Line className={styles.removeBtn} />
        <div className={styles.columnColor} style={{ backgroundColor: color }}></div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.tasksCount}>({tasks.length})</p>
      </div>
      <div className={styles.tasksContainer}>
        {tasks.map((task) => {
          return <Task key={task._id} item={task} />;
        })}
        <NewTask />
      </div>
    </div>
  );
};

export default Column;
