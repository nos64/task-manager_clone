import React, { useEffect, useState, useRef } from 'react';
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
import { setColumnTitle, setSelectedColumn } from 'store/reducers/boardSlice';
import TaskModal from 'components/TaskModal';

type ColumnProps = {
  item: IColumn;
  index: number;
  setIsTaskDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsColumnDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const Column: React.FC<ColumnProps> = ({ item, index, setIsTaskDeleting, setIsColumnDeleting }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.column.tasks[item._id]) || [];
  const selectedTask = useAppSelector((state) => state.column.selectedTask);

  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

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

  const handleColumnTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateColumnTitle();
    }
  };

  const handleRemoveTaskBtnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsColumnDeleting(true);
    dispatch(setSelectedColumn(item));
  };

  useEffect(() => {
    dispatch(getTasks({ boardId: item.boardId, columnId: item._id }));
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
                <div
                  className={styles.columnWrapper}
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  <div className={styles.columnHeader}>
                    <RiDeleteBin6Line
                      className={styles.removeBtn}
                      onClick={handleRemoveTaskBtnClick}
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
                          <IoIosCheckmark
                            className={styles.editBtnOK}
                            onClick={updateColumnTitle}
                          />
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
                      className={`${styles.tasksContainer} ${!tasks.length ? styles.noTasks : ''}`}
                    >
                      {tasks.map((task, index) => {
                        return (
                          <Task
                            key={task._id}
                            item={task}
                            index={index}
                            toggleModal={toggleModal}
                            setModalMode={setModalMode}
                            setIsTaskDeleting={setIsTaskDeleting}
                          />
                        );
                      })}
                      {dropProvided.placeholder}
                    </div>
                    <NewTask toggleModal={toggleModal} setModalMode={setModalMode} />
                  </div>
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
        currentColumn={item}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default Column;
