import { createTask as createTaskApi } from '../api/task';
import { Task } from '../types/task';
import { TTaskList } from '../types/taskList';

const useTask = () => {
  const addTask = async (
    listId: TTaskList['id'],
    taskName: Task['taskName'],
    order: Task['order']
  ) => {
    try {
      const res = await createTaskApi(listId, taskName, order);
      return res.data;
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  return { addTask };
};

export default useTask;
