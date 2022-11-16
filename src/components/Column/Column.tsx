import React from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DndType } from 'common/dnd-types';

type ColumnProps = {
  id: string;
  title: string;
  tasks: ITask[];
  index: number;
};

const Column: React.FC<ColumnProps> = ({ id, title, tasks, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.columnHeader}>
            <RiDeleteBin6Line className={styles.removeBtn} />
            <div className={styles.columnColor}></div>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.tasksCount}>({tasks.length})</p>
          </div>

          <Droppable droppableId={id} type={DndType.TASK}>
            {(provided) => (
              <div className={styles.columnContent}>
                <div
                  className={styles.tasksContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => {
                    return <Task key={task._id} item={task} index={index} />;
                  })}
                  {provided.placeholder}
                </div>

                <NewTask />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
