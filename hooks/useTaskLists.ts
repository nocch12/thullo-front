import {
  createTaskList as createTaskListApi,
  deleteTaskList as deleteTaskListApi,
  getTaskLists as getTaskListsApi,
} from '../api/taskList';
import { DEFAULT_ORDER, DND_TYPE } from '../config/const';
import { Board } from '../types/board';
import {
  TTaskList,
  TTaskListFormatted,
  TTaskListOrder,
  TTaskLists,
} from '../types/taskList';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskListsOrderState, taskListsState } from '../store/taskList';
import { TasksState } from '../store/task';
import { Task, TTasks } from '../types/task';
import { DropResult, OnDragEndResponder } from 'react-beautiful-dnd';
import useTask from './useTask';

const usetaskLists = (boardId: Board['id']) => {
  const { addTask } = useTask();
  const [lists, setLists] = useState<TTaskLists>({});
  const [listIds, setListIds] = useState<TTaskListOrder>([]);
  const [tasks, setTasks] = useState<TTasks>({});

  // const nextOrder = lists?.slice(-1)[0]?.order + DEFAULT_ORDER;
  const nextOrder = DEFAULT_ORDER;

  useEffect(() => {
    setLists([]);
    if (boardId) {
      getLists();
    }
  }, [boardId]);

  // リスト一覧取得
  const getLists = async () => {
    try {
      const res = await getTaskListsApi(boardId);
      const obj: TTaskLists = {};
      res.data.forEach((l) => {
        const tIds = l.Task.map((t) => t.id);
        obj[l.id] = {
          ...l,
          Task: tIds,
        };
      });
      setLists(obj);

      const _tasks = {};

      const sorted = res.data
        .sort((a, b) => a.order - b.order)
        .map((d) => {
          d.Task.map((t) => (_tasks[t.id] = t));
          return d.id;
        });
      setTasks(_tasks);
      setListIds(sorted);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('f');
    }
  };

  // リスト追加
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

  // リスト削除
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

  // タスク追加
  const addTaskToLists = async (
    listId: TTaskList['id'],
    taskName: Task['taskName']
  ) => {
    const oldList = lists[listId];
    const [lastTaskId] = oldList.Task.slice(-1);
    const order = tasks[lastTaskId].order + DEFAULT_ORDER;
    const task = await addTask(listId, taskName, order);

    // タスク追加
    setTasks((prev) => ({
      ...prev,
      [task.id]: task,
    }));

    const newList: TTaskListFormatted = {
      ...oldList,
      Task: [...oldList.Task, task.id],
    };
    setLists((prev) => ({
      ...prev,
      [newList.id]: newList,
    }));
  };

  // ドラッグ終了処理
  const taskDragEnd = (result: DropResult) => {
    console.log('start', { lists });

    const { destination, source, draggableId } = result;
    const destId = destination.droppableId;
    const sourceId = source.droppableId;

    if (destId === sourceId && destination.index === source.index) {
      return;
    }

    const start = lists[sourceId];
    const finish = lists[destId];

    if (start === finish) {
      const newTaskIds = Array.from(start.Task);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        Task: newTaskIds,
      };

      const newLists = {
        ...lists,
        [newColumn.id]: newColumn,
      };

      setLists(newLists);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.Task);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      Task: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.Task);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      Task: finishTaskIds,
    };

    const newState = {
      ...lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setLists(newState);
  };

  // ドラッグ終了ハンドラ
  const handleDragEnd: OnDragEndResponder = (result, provided) => {
    console.log(result);

    if (result.type === DND_TYPE.TASK) {
      taskDragEnd(result);
    }
  };
  return {
    tasks,
    listIds,
    lists,
    addTaskToLists,
    addList,
    deleteList,
    handleDragEnd,
  };
};

export default usetaskLists;
