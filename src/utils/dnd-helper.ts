import { DraggableLocation } from 'react-beautiful-dnd';
import ITask from 'types/ITask';

export const reorderTasks = (
  destination: DraggableLocation,
  draggableId: string,
  sourceColumn: { _id: string; title: string; order: number; tasks: ITask[] }
) => {
  const removedTask = sourceColumn.tasks.find((task) => task._id === draggableId);
  if (!removedTask) return;

  const tasksWithoutRemoved = sourceColumn.tasks.filter((task) => task._id !== draggableId);
  const newOrderedTasks = [
    ...tasksWithoutRemoved.slice(0, destination.index),
    removedTask,
    ...tasksWithoutRemoved.slice(destination.index),
  ].map((task, index) => ({ ...task, order: index }));

  const newSourceColumn = { ...sourceColumn, tasks: newOrderedTasks };
  return newSourceColumn;
};

export const moveTask = (
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string,
  sourceColumn: { _id: string; title: string; order: number; tasks: ITask[] },
  // destinationColumn: { _id: string; title: string; order: number; tasks: ITask[] }
  columns: { _id: string; title: string; order: number; tasks: ITask[] }[]
) => {
  const destinationColumn = columns.find((item) => item._id == destination.droppableId);
  if (!destinationColumn) return { sourceColumn, destinationColumn };

  const removedTask = sourceColumn.tasks.find((task) => task._id === draggableId);
  if (!removedTask) return { sourceColumn, destinationColumn };

  const tasksWithoutRemoved = sourceColumn.tasks.filter((task) => task._id !== draggableId);

  const newSourceOrderedTasks = [
    ...tasksWithoutRemoved.slice(0, source.index),
    ...tasksWithoutRemoved.slice(source.index),
  ].map((task, index) => ({ ...task, order: index }));

  const newSourceColumn = { ...sourceColumn, tasks: newSourceOrderedTasks };

  const newDestinationOrderedTasks = [
    ...destinationColumn.tasks.slice(0, destination.index),
    removedTask,
    ...destinationColumn.tasks.slice(destination.index),
  ].map((task, index) => ({ ...task, order: index }));

  const newDestinationColumn = { ...destinationColumn, tasks: newDestinationOrderedTasks };

  return { newSourceColumn, newDestinationColumn };
};

export const moveColumn = (
  destination: DraggableLocation,
  draggableId: string,
  columns: { _id: string; title: string; order: number; tasks: ITask[] }[]
) => {
  const removedColumn = columns.find((column) => column._id === draggableId);
  if (!removedColumn) return;

  const columnsWithoutRemoved = columns.filter((column) => column._id !== draggableId);
  const newOrderedColumns = [
    ...columnsWithoutRemoved.slice(0, destination.index),
    removedColumn,
    ...columnsWithoutRemoved.slice(destination.index),
  ].map((column, index) => ({ ...column, order: index }));

  return newOrderedColumns;
};
