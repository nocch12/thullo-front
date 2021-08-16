import { TSimpleUser } from './user';

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
