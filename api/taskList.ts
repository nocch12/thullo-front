import { axios } from '../libs/axios';
import { Board } from '../types/board';
import { TaskList } from '../types/taskList';

// タスクリスト一覧取得
export const getTaskLists = (boardId: Board['id']) => {
  return axios.get<TaskList[]>(`/board/${boardId}/taskList`);
};

// タスクリスト作成
export const createTaskList = (
  boardId: Board['id'],
  listName: TaskList['listName'],
  order: TaskList['order']
) => {
  return axios.post<TaskList>(`/taskList`, {
    boardId,
    listName,
    order,
  });
};
