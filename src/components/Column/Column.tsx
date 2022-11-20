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
import { setColumnTitle } from 'store/reducers/boardSlice';

type ColumnProps = {
  item: IColumn;
  index: number;
};

const Column: React.FC<ColumnProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.column[item._id]) || [];

  const [isTitleEdited, setIsTitleEdited] = useState(false);

  const columnTitleRef = useRef<HTMLInputElement>(null);
  const updateColumnTitle = () => {
    const title = columnTitleRef.current?.value;
    if (!title) return;

    if (item.title !== title) {
      dispatch(setColumnTitle({ column: item, newTitle: title }));
    }
    setIsTitleEdited(false);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(getTasks({ boardId: item.boardId, columnId: item._id }));
    };
    asyncFunc();
  }, [dispatch]);

  return (
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
                <RiDeleteBin6Line className={styles.removeBtn} />
                <div className={styles.columnColor}></div>
                {!isTitleEdited && (
                  <h4 className={styles.title} onClick={() => setIsTitleEdited(true)}>
                    {item.title}
                  </h4>
                )}
                {isTitleEdited && (
                  <div className={styles.editControl}>
                    <input
                      className={styles.editInput}
                      type="text"
                      defaultValue={item.title}
                      ref={columnTitleRef}
                    />
                    <div className={styles.editBtns}>
                      <IoIosCheckmark className={styles.editBtnOK} onClick={updateColumnTitle} />
                      <IoIosClose
                        className={styles.editBtnCancel}
                        onClick={() => setIsTitleEdited(false)}
                      />
                    </div>
                  </div>
                )}
                {!isTitleEdited && <p className={styles.tasksCount}>({tasks.length})</p>}
              </div>

              <div className={styles.columnContent}>
                <div
                  className={styles.tasksContainer}
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  {tasks.map((task, index) => {
                    return <Task key={task._id} item={task} index={index} />;
                  })}
                  {dropProvided.placeholder}
                </div>

                <NewTask />
              </div>
            </div>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};

export default Column;
