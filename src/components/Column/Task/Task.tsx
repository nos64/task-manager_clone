import React, { useEffect } from 'react';
import ITask from 'types/ITask';
import styles from './Task.module.scss';
import { IoMdClose } from 'react-icons/io';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getTaskAssignee } from 'store/reducers/taskSlice';
import { setSelectedTask } from 'store/reducers/columnSlice';

type TaskProps = {
  item: ITask;
  index: number;
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setIsTaskDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const Task: React.FC<TaskProps> = ({
  item,
  index,
  toggleModal,
  setModalMode,
  setIsTaskDeleting,
}) => {
  const dispatch = useAppDispatch();
  const assigneeName = useAppSelector((state) => state.task.assignees[item._id]);

  const assigneeId = item.users[0];

  const handleEditIconClick = () => {
    toggleModal();
    setModalMode('edit');
    dispatch(setSelectedTask(item));
  };

  const handleRemoveTaskBtnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTaskDeleting(true);
    dispatch(setSelectedTask(item));
  };

  useEffect(() => {
    if (item.users[0]) {
      dispatch(getTaskAssignee({ userId: item.users[0], taskId: item._id }));
    }
  }, [dispatch, assigneeId, item._id, item.users]);

  return (
    <>
      <Draggable draggableId={item._id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`${styles.task} ${snapshot.isDragging ? styles.dragged : ''}`}
            onClick={handleEditIconClick}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.taskContent}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.assignee}>{`Assignee: ${
                assigneeName ? assigneeName : 'not yet'
              }`}</p>
            </div>
            <IoMdClose className={styles.removeTaskIcon} onClick={handleRemoveTaskBtnClick} />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
