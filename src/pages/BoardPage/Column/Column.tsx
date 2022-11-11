import React from 'react';
import styles from './Column.module.scss';
import Task from './Task/Task';

type ColumnProps = {
  title: string;
  color: string;
  tasks: { id: number; title: string }[];
};

const Column: React.FC<ColumnProps> = ({ title, color, tasks }) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnColor} style={{ backgroundColor: color }}></div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.tasksCount}>({tasks.length})</p>
      </div>
      <div className={styles.tasksContainer}>
        {tasks.map((task) => {
          return <Task key={task.id} />;
        })}
      </div>
    </div>
  );
};

export default Column;
