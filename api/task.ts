import { axios } from '../libs/axios';
import { Task } from '../types/task';
import { TTaskList } from '../types/taskList';

// タスク作成
export const createTask = (
  listId: TTaskList['id'],
  taskName: Task['taskName'],
  order: Task['order']
) => {
  return axios.post<Task>(`/task`, {
    listId,
    taskName,
    order,
  });
};

// タスク更新
export const updateTask = (
  taskId: Task['id'],
  params: Partial<Pick<Task, 'listId' | 'order'>> = {}
) => {
  if (!params.listId && !params.order) {
    return false;
  }
  return axios.post<TTaskList>(`/task/${taskId}`, params);
};
