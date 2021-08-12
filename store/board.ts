import { Board } from '../types/board';
import { atom } from 'recoil';

export const boardState = atom<Board | null>({
  key: 'board/detail',
  default: null,
});

export const boardUserState = atom<Board['users']>({
  key: 'board/users',
  default: [],
});
