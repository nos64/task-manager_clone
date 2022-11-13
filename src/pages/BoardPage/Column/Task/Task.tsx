import React from 'react';
import ITask from 'types/ITask';
import styles from './Task.module.scss';
import { IoMdClose } from 'react-icons/io';

type TaskProps = {
  item: Partial<ITask>;
};

const Task: React.FC<TaskProps> = ({ item }) => {
  return (
    <div className={styles.task}>
      <div className={styles.taskContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.assignee}>{`Assignee: ${item.users ? item?.users[0] : 'not yet'}`}</p>
      </div>
      <IoMdClose className={styles.removeTaskIcon} />
    </div>
  );
};

export default Task;
