import { atom } from 'recoil';
import { Task } from '../types/task';

export const currentDraggingTaskState = atom<string>({
  key: 'task/currentDragging',
  default: null,
});

export const TasksState = atom<{ [key in Task['id']]: Task }>({
  key: 'task/list',
  default: {},
});
