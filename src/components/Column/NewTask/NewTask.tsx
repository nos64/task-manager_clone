import React from 'react';
import styles from './NewTask.module.scss';
import { GoPlus } from 'react-icons/go';
import ITask from 'types/ITask';
interface NewTaskProps {
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

const NewTask: React.FC<NewTaskProps> = ({ toggleModal, setModalMode, setSelectedTask }) => {
  const handleClick = () => {
    toggleModal();
    setModalMode('create');
    setSelectedTask(null);
  };

  return (
    <div className={styles.newTask} onClick={handleClick}>
      <GoPlus className={styles.newTaskIcon} />
      <p className={styles.newTaskTitle}>Add Task</p>
    </div>
  );
};

export default NewTask;
