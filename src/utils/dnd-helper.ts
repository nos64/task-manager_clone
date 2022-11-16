import { DraggableLocation } from 'react-beautiful-dnd';
import ITask from 'types/ITask';

export const reorderTasks = (
  source: DraggableLocation,
  destination: DraggableLocation,
  column: { _id: string; title: string; order: number; tasks: ITask[] }
) => {
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

  tasks[source.index].order = destination.index;

  column.tasks = [...tasks.sort((task1, task2) => (task1.order! < task2.order! ? -1 : 1))];

  return column;
};

export const moveTask = (
  source: DraggableLocation,
  destination: DraggableLocation,
  sourceColumn: { _id: string; title: string; order: number; tasks: ITask[] },
  destinationColumn: { _id: string; title: string; order: number; tasks: ITask[] }
) => {
  const removedTask = sourceColumn.tasks.splice(source.index, 1)[0];

  const tasks = destinationColumn.tasks.map((task) =>
    task.order >= destination.index ? { ...task, order: task.order + 1 } : task
  );
  removedTask.order = destination.index;

  const newTasks = [...tasks, removedTask];
  destinationColumn.tasks = newTasks.sort((task1, task2) => (task1.order! < task2.order! ? -1 : 1));

  return destinationColumn;
};
