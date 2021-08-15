import { TErrorState } from '../types/error';
import { atom } from 'recoil';

export const errorState = atom<TErrorState>({
  key: 'error/status',
  default: {},
});
