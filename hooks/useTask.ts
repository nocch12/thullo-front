import { useRecoilState } from 'recoil';
import { createTask as createTaskApi } from '../api/task';
import { DEFAULT_ORDER } from '../config/const';
import { taskListsState } from '../store/taskList';
import { Task } from '../types/task';
import { TTaskList } from '../types/taskList';

const useTask = (list: TTaskList) => {
  const [lists, setLists] = useRecoilState(taskListsState);

  // const nextOrder = list.Task.slice(-1)[0]?.order + DEFAULT_ORDER;
  const nextOrder = DEFAULT_ORDER;

  const addTask = async (taskName: Task['taskName']) => {
    try {
      const res = await createTaskApi(list.id, taskName, nextOrder);

      const newTasks = [...list.Task];
      newTasks.push(res.data.id);
      const newList = {
        ...list,
        Task: newTasks,
      };

      const newLists = { ...lists, [newList.id]: newList };
      setLists(newLists);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  return { addTask };
};

export default useTask;
