import { Board } from './board';
import { Task } from './task';

export type TTaskList = {
  id: number;
  listName: string;
  boardId: Board['id'];
  order: number;
  Task: Task[];
};
