import ITask from 'types/ITask';

const initialTasks: ITask[][] = [
  [
    {
      _id: '1',
      title: 'task 1',
      description: 'description',
      order: 0,
      boardId: 'id',
      columnId: 'id',
      userId: 'id',
      users: [],
    },
    {
      _id: '2',
      title: 'task 2',
      description: 'description',
      order: 1,
      boardId: 'id',
      columnId: 'id',
      userId: 'id',
      users: ['user1'],
    },
  ],
  [
    {
      _id: '3',
      title: 'task 1',
      description: 'description',
      order: 0,
      boardId: 'id',
      columnId: 'id',
      userId: 'id',
      users: ['user1'],
    },
    {
      _id: '4',
      title: 'task 2',
      description: 'description',
      order: 1,
      boardId: 'id',
      columnId: 'id',
      userId: 'id',
      users: ['user1'],
    },
    {
      _id: '5',
      title: 'task 3',
      description: 'description',
      order: 2,
      boardId: 'id',
      columnId: 'id',
      userId: 'id',
      users: [],
    },
  ],
];

export const initialColumns = [
  {
    _id: '11',
    title: 'Column Name 1',
    order: 0,
    tasks: initialTasks[0],
  },
  {
    _id: '22',
    title: 'Column Name 2',
    order: 1,
    tasks: initialTasks[1],
  },
  {
    _id: '33',
    title: 'Column Name 3',
    order: 2,
    tasks: [],
  },
];
