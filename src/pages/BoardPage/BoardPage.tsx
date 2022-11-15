import { ROUTES } from 'common/routes';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Column from '../../components/Column';
import { FaLessThan } from 'react-icons/fa';
import NewColumn from '../../components/NewColumn';
import ITask from 'types/ITask';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { initialTasks } from 'data/tasks';

const BoardPage = () => {
  const boardTitle = 'board title';
  const boardDescription = 'Booard description';
  const tasks: ITask[][] = initialTasks;

  const initialColumns = [
    {
      _id: '11',
      title: 'Column Name 1',
      order: 2,
      color: '#8d7cee',
      tasks: tasks[0],
    },
    {
      _id: '22',
      title: 'Column Name 2',
      order: 1,
      color: '#306ee8',
      tasks: tasks[1],
    },
  ];
  const sortedColumns = initialColumns.sort((col1, col2) => (col1.order < col2.order ? -1 : 1));

  const [columns, setColumns] = useState(sortedColumns);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = columns.find((item) => item._id == source.droppableId);
    if (!column || !column.tasks) return;

    const draggableTaskIndex = column.tasks.findIndex((item) => item._id === draggableId);

    if (destination.droppableId !== source.droppableId) {
      const removedTask = column.tasks.splice(draggableTaskIndex, 1)[0];
      const newColumn = columns.find((item) => item._id == destination.droppableId);

      if (!newColumn) return;

      const tasks = newColumn.tasks.map((task) =>
        task.order >= destination.index ? { ...task, order: task.order + 1 } : task
      );
      removedTask.order = destination.index;
      console.log('destination index', destination.index);

      const newTasks = [...tasks, removedTask];
      newColumn.tasks = newTasks.sort((task1, task2) => (task1.order! < task2.order! ? -1 : 1));

      const newColumns = [
        ...columns.filter(
          (item) => item._id !== source.droppableId && item._id !== destination.droppableId
        ),
        column,
        newColumn,
      ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));

      setColumns(newColumns);
    } else {
      const tasks =
        destination.index > source.index
          ? column.tasks.map((task) =>
              task.order! <= destination.index && task.order! > source.index
                ? { ...task, order: task.order! - 1 }
                : task
            )
          : column.tasks.map((task) =>
              task.order! >= destination.index && task.order! < source.index
                ? { ...task, order: task.order! + 1 }
                : task
            );

      tasks[draggableTaskIndex].order = destination.index;

      column.tasks = [...tasks.sort((task1, task2) => (task1.order! < task2.order! ? -1 : 1))];

      const newColumns = [
        ...columns.filter((item) => item._id !== source.droppableId),
        column,
      ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));

      setColumns(newColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.pageContent}>
        <div className={styles.topBlock}>
          <Link className={styles.backBtn} to={ROUTES.BOARDS}>
            <FaLessThan className={styles.backBtnIcon} />
            <span>Back</span>
          </Link>
          <div className={styles.boardInfo}>
            <h3 className={styles.title}>{`Board: ${boardTitle}`}</h3>
            <p className={styles.description}>{boardDescription}</p>
          </div>
        </div>
        <div className={styles.columnsContainer}>
          {columns.map((column, index) => {
            return (
              <Column
                key={column._id}
                id={column._id}
                title={column.title}
                color={column.color}
                tasks={column.tasks}
                index={index}
              />
            );
          })}
          <NewColumn />
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardPage;
