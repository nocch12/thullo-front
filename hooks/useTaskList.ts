import {
  createTaskList as createTaskListApi,
  deleteTaskList as deleteTaskListApi,
  getTaskLists as getTaskListsApi,
} from '../api/taskList';
import { DEFAULT_ORDER } from '../config/const';
import { Board } from '../types/board';
import { TTaskList, TTaskLists } from '../types/taskList';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskListsOrderState, taskListsState } from '../store/taskList';

const usetaskList = (boardId: Board['id']) => {
  const [lists, setLists] = useRecoilState(taskListsState);
  const [listIds, setListIds] = useRecoilState(taskListsOrderState);

  // const nextOrder = lists?.slice(-1)[0]?.order + DEFAULT_ORDER;
  const nextOrder = DEFAULT_ORDER;

  useEffect(() => {
    setLists([]);
    if (boardId) {
      getLists();
    }
  }, [boardId]);

  const getLists = async () => {
    try {
      const res = await getTaskListsApi(boardId);
      const obj: TTaskLists = {};
      res.data.forEach((l) => (obj[l.id] = l));
      setLists(obj);

      const sorted = res.data
        .sort((a, b) => a.order - b.order)
        .map((d) => d.id);
      setListIds(sorted);
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
      setLists((prev) => ({ ...prev, [newList.id]: newList }));
      setListIds((prev) => [...prev, newList.id]);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  const deleteList = async (listId: TTaskList['id']) => {
    try {
      const res = await deleteTaskListApi(listId);
      setLists((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [listId]: _, ...filtered } = prev;
        return filtered;
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  return { listIds, lists, addList, deleteList };
};

export default usetaskList;
