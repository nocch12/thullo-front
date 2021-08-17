import { axios } from '../libs/axios';
import { Board } from '../types/board';
import { TTaskList } from '../types/taskList';

// タスクリスト一覧取得
export const getTaskLists = (boardId: Board['id']) => {
  return axios.get<TTaskList[]>(`/board/${boardId}/taskList`);
};

// タスクリスト作成
export const createTaskList = (
  boardId: Board['id'],
  listName: TTaskList['listName'],
  order: TTaskList['order']
) => {
  return axios.post<TTaskList>(`/taskList`, {
    boardId,
    listName,
    order,
  });
};

// タスクリスト削除
export const deleteTaskList = (listId: TTaskList['id']) => {
  return axios.post<boolean>(`/taskList/delete`, {
    listId,
  });
};
