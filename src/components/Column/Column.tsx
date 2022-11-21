import React, { useEffect, useState, useRef } from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DndType } from 'common/dnd-types';
import IColumn from 'types/IColumn';
import { IoIosClose, IoIosCheckmark } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getTasks } from 'store/reducers/columnSlice';
import { deleteBoardColumn, setColumnTitle } from 'store/reducers/boardSlice';
import TaskModal from 'components/TaskModal';
import WarningModal from 'components/WarningModal';
import { deleteColumnWarningMessage } from 'common/constants';

type ColumnProps = {
  item: IColumn;
  index: number;
};

const Column: React.FC<ColumnProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.column[item._id]) || [];

  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [isColumnDeleting, setIsColumnDeleting] = useState(false);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const columnTitleRef = useRef<HTMLInputElement>(null);

  const updateColumnTitle = () => {
    const title = columnTitleRef.current?.value;
    if (!title) return;

    if (item.title !== title) {
      dispatch(setColumnTitle({ column: item, newTitle: title }));
    }
    setIsTitleEditing(false);
  };

  const deleteColumn = () => {
    dispatch(deleteBoardColumn(item));
    setIsColumnDeleting(false);
  };

  const handleColumnTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateColumnTitle();
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(getTasks({ boardId: item.boardId, columnId: item._id }));
    };
    asyncFunc();
  }, [dispatch, item._id, item.boardId]);

  return (
    <>
      <Draggable draggableId={item._id} index={index}>
        {(dragProvided, snapshot) => (
          <Droppable droppableId={item._id} type={DndType.TASK}>
            {(dropProvided, dropSnapshot) => (
              <div
                className={`${styles.column} ${snapshot.isDragging ? styles.dragged : ''} ${
                  dropSnapshot.isDraggingOver ? styles.dropped : ''
                }`}
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
              >
                <div className={styles.columnHeader}>
                  <RiDeleteBin6Line
                    className={styles.removeBtn}
                    onClick={() => setIsColumnDeleting(true)}
                  />
                  <div className={styles.columnColor}></div>
                  {!isTitleEditing && (
                    <h4 className={styles.title} onClick={() => setIsTitleEditing(true)}>
                      {item.title}
                    </h4>
                  )}
                  {isTitleEditing && (
                    <div className={styles.editControl}>
                      <input
                        className={styles.editInput}
                        type="text"
                        defaultValue={item.title}
                        ref={columnTitleRef}
                        onKeyDown={handleColumnTitleKeyDown}
                      />
                      <div className={styles.editBtns}>
                        <IoIosCheckmark className={styles.editBtnOK} onClick={updateColumnTitle} />
                        <IoIosClose
                          className={styles.editBtnCancel}
                          onClick={() => setIsTitleEditing(false)}
                        />
                      </div>
                    </div>
                  )}
                  {!isTitleEditing && <p className={styles.tasksCount}>({tasks.length})</p>}
                </div>

                <div className={styles.columnContent}>
                  <div
                    className={styles.tasksContainer}
                    ref={dropProvided.innerRef}
                    {...dropProvided.droppableProps}
                  >
                    {tasks.map((task, index) => {
                      return (
                        <Task
                          key={task._id}
                          item={task}
                          index={index}
                          toggleModal={toggleModal}
                          setModalMode={setModalMode}
                          setSelectedTask={setSelectedTask}
                        />
                      );
                    })}
                    {dropProvided.placeholder}
                  </div>

                  <NewTask
                    toggleModal={toggleModal}
                    setModalMode={setModalMode}
                    setSelectedTask={setSelectedTask}
                  />
                </div>
              </div>
            )}
          </Droppable>
        )}
      </Draggable>
      <TaskModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={modalMode}
        selectedTask={selectedTask}
      />
      <WarningModal
        isModalActive={isColumnDeleting}
        deleteBtnHandler={() => deleteColumn()}
        cancelBtnHandler={() => setIsColumnDeleting(false)}
        message={deleteColumnWarningMessage}
      />
    </>
  );
};

export default Column;
