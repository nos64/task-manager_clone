import React, { useState } from 'react';
import ITask from 'types/ITask';
import styles from './Column.module.scss';
import Task from './Task';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewTask from './NewTask/NewTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DndType } from 'common/dnd-types';
import TaskModal from 'components/TaskModal';

type ColumnProps = {
  item: { _id: string; title: string; tasks: ITask[] };
  index: number;
};

const Column: React.FC<ColumnProps> = ({ item, index }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

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
    </>
  );
};

export default Column;
