import React from 'react';
import styles from './NewTask.module.scss';
import { GoPlus } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { setSelectedTask } from 'store/reducers/columnSlice';
import IColumn from 'types/IColumn';
import { setSelectedColumn } from 'store/reducers/boardSlice';

interface NewTaskProps {
  toggleModal: (value: boolean) => void;
  currentColumn: IColumn;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
}

const NewTask: React.FC<NewTaskProps> = ({ toggleModal, setModalMode, currentColumn }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    console.log('123');
    toggleModal(true);
    setModalMode('create');
    dispatch(setSelectedTask(null));
    dispatch(setSelectedColumn(currentColumn));
  };

  return (
    <div className={styles.newTask} onClick={handleClick}>
      <GoPlus className={styles.newTaskIcon} />
      <p className={styles.newTaskTitle}>{t('addTask')}</p>
    </div>
  );
};

export default NewTask;
