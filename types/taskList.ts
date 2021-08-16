import { Board } from './board';
import { Task } from './task';

export type TaskList = {
  id: number;
  listName: string;
  boardId: Board['id'];
  order: number;
  Task: Task[];
};
