import { DraggableLocation } from 'react-beautiful-dnd';
import IColumn from 'types/IColumn';
import ITask from 'types/ITask';

export const reorderTasks = (
  destination: DraggableLocation,
  draggableId: string,
  sourceColumnTasks: ITask[]
) => {
  const removedTask = sourceColumnTasks.find((task) => task._id === draggableId);
  if (!removedTask) return;

  const tasksWithoutRemoved = sourceColumnTasks.filter((task) => task._id !== draggableId);
  const newOrderedTasks = [
    ...tasksWithoutRemoved.slice(0, destination.index),
    removedTask,
    ...tasksWithoutRemoved.slice(destination.index),
  ].map((task, index) => ({ ...task, order: index }));

  return newOrderedTasks;
};

export const moveTask = (
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string,
  sourceColumnTasks: ITask[],
  destinationColumnTasks: ITask[]
) => {
  const removedTask = sourceColumnTasks.find((task) => task._id === draggableId);
  if (!removedTask) return { sourceColumnTasks, destinationColumnTasks };

  const tasksWithoutRemoved = sourceColumnTasks.filter((task) => task._id !== draggableId);

  const newSourceOrderedTasks = [
    ...tasksWithoutRemoved.slice(0, source.index),
    ...tasksWithoutRemoved.slice(source.index),
  ].map((task, index) => ({ ...task, order: index }));

  const newTask = { ...removedTask, columnId: destination.droppableId };
  const newDestinationOrderedTasks = [
    ...destinationColumnTasks.slice(0, destination.index),
    newTask,
    ...destinationColumnTasks.slice(destination.index),
  ].map((task, index) => ({ ...task, order: index }));

  return { newSourceOrderedTasks, newDestinationOrderedTasks };
};

export const moveColumn = (
  destination: DraggableLocation,
  draggableId: string,
  columns: IColumn[]
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
