import { atom } from 'recoil';

export const currentDraggingTaskState = atom<string>({
  key: 'task/currentDragging',
  default: null,
});
