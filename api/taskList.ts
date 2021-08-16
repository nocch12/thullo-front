import { axios } from '../libs/axios';
import { Board } from '../types/board';
import { TaskList } from '../types/taskList';

// ボード一覧取得
export const getTaskLists = (boardId: Board['id']) => {
  return axios.get<TaskList[]>(`/board/${boardId}/taskList`);
};
