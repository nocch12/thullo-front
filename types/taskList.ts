import { Board } from './board';
import { Task, TTaskIds } from './task';

export type TTaskLists = {
  [key in TTaskList['id']]: TTaskListFormatted;
};

export type TTaskList = {
  id: number;
  listName: string;
  boardId: Board['id'];
  order: number;
  Task: Task[];
};

export type TTaskListFormatted = {
  id: number;
  listName: string;
  boardId: Board['id'];
  order: number;
  Task: Task['id'][];
};

export type TTaskListOrder = TTaskList['id'][];
