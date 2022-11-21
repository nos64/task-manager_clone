import IBoard from './IBoard';
import IColumn from './IColumn';
import ITask from './ITask';
import IUser from './IUser';

export type BoardPick = Pick<IBoard, 'title' | 'description' | 'owner' | 'users'>;
export type ColumnPick = Pick<IColumn, 'title' | 'order'>;
export type TaskPickCreate = Pick<ITask, 'title' | 'order' | 'description' | 'userId' | 'users'>;
export type UserPick = Pick<IUser, 'login' | 'name' | 'password'>;
export type UserResponsePick = Pick<IUser, '_id' | 'login' | 'name'>;
export type SignInPick = Pick<IUser, 'login' | 'password'>;
export type TaskPickUpdate = Pick<
  ITask,
  'title' | 'order' | 'description' | 'columnId' | 'userId' | 'users'
>;
