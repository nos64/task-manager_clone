import React from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DndType } from 'common/dnd-types';

type ColumnProps = {
  item: { _id: string; title: string; tasks: ITask[] };
  index: number;
};

const Column: React.FC<ColumnProps> = ({ item, index }) => {
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
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.tasksCount}>({item.tasks.length})</p>
              </div>

              <div className={styles.columnContent}>
                <div
                  className={styles.tasksContainer}
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  {item.tasks.map((task, index) => {
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
