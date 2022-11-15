import React from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';
import { Droppable } from 'react-beautiful-dnd';

type ColumnProps = {
  id: string;
  title: string;
  color: string;
  tasks: ITask[];
  index: number;
};

const Column: React.FC<ColumnProps> = ({ id, title, color, tasks }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <RiDeleteBin6Line className={styles.removeBtn} />
            <div className={styles.columnColor} style={{ backgroundColor: color }}></div>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.tasksCount}>({tasks.length})</p>
          </div>

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
        </div>
      )}
    </Droppable>
  );
};

export default Column;
