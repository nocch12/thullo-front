import { Board } from './board';
import { TTaskIds } from './task';

export type TTaskLists = {
  [key in TTaskList['id']]: TTaskList;
};

export type TTaskList = {
  id: number;
  listName: string;
  boardId: Board['id'];
  order: number;
  Task: TTaskIds;
};

export type TTaskListOrder = TTaskList['id'][];
