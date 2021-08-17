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
