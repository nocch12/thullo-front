import { TSimpleUser } from './user';

export type TTasks = {
  [key in Task['id']]: Task;
};

export type Task = {
  id: number;
  taskName: string;
  order: number;
  imgePath?: string;
  commentCount?: number;
  fileCount?: number;
  users: TSimpleUser[];
  labels: [];
};

export type TTaskIds = Task['id'][];
