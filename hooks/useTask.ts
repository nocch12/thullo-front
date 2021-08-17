import { createTask as createTaskApi } from '../api/task';
import { DEFAULT_ORDER } from '../config/const';
import { Task } from '../types/task';
import { TTaskList } from '../types/taskList';
import { useState } from 'react';

const useTask = (list: TTaskList) => {
  const [taskList, setTaskList] = useState(list);

  const nextOrder = taskList.Task.slice(-1)[0]?.order + DEFAULT_ORDER;

  const addTask = async (taskName: Task['taskName']) => {
    try {
      const res = await createTaskApi(taskList.id, taskName, nextOrder);
      setTaskList((prev) => {
        const newTasks = [...prev.Task];
        newTasks.push(res.data);
        return {
          ...prev,
          Task: newTasks,
        };
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  return { taskList, addTask };
};

export default useTask;
