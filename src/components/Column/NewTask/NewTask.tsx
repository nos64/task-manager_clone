import React from 'react';
import styles from './NewTask.module.scss';
import { GoPlus } from 'react-icons/go';

const NewTask = () => {
  return (
    <div className={styles.newTask}>
      <GoPlus className={styles.newTaskIcon} />
      <p className={styles.newTaskTitle}>Add Task</p>
    </div>
  );
};

export default NewTask;
