import {
  createTaskList as createTaskListApi,
  deleteTaskList as deleteTaskListApi,
  getTaskLists as getTaskListsApi,
} from '../api/taskList';
import { DEFAULT_ORDER } from '../config/const';
import { Board } from '../types/board';
import { TTaskList } from '../types/taskList';
import { useEffect, useState } from 'react';

const usetaskList = (boardId: Board['id']) => {
  const [lists, setLists] = useState<TTaskList[]>([]);

  const nextOrder = lists?.slice(-1)[0]?.order + DEFAULT_ORDER;

  useEffect(() => {
    setLists([]);
    if (boardId) {
      getLists();
    }
  }, [boardId]);

  const getLists = async () => {
    try {
      const res = await getTaskListsApi(boardId);
      setLists(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  const addList = async (listName: TTaskList['listName']) => {
    try {
      const res = await createTaskListApi(boardId, listName, nextOrder);
      const newList = {
        ...res.data,
        Task: [],
      };
      setLists((prev) => [...prev, newList]);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  const deleteList = async (listId: TTaskList['id']) => {
    try {
      const res = await deleteTaskListApi(listId);
      setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  return { lists, addList, deleteList };
};

export default usetaskList;
