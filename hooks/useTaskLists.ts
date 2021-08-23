import {
  createTaskList as createTaskListApi,
  deleteTaskList as deleteTaskListApi,
  getTaskLists as getTaskListsApi,
  updateTaskList as updateTaskListApi,
} from '../api/taskList';
import { updateTask as updateTaskApi } from '../api/task';
import { DEFAULT_ORDER, DND_TYPE } from '../config/const';
import { Board } from '../types/board';
import {
  TTaskList,
  TTaskListFormatted,
  TTaskListOrder,
  TTaskLists,
} from '../types/taskList';
import { useEffect, useState } from 'react';
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

  // タスク移動処理
  const taskDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const taskId = Number(draggableId);
    if (!destination) return;

    // 通信エラー時にロールバックするため現在の状態を補完
    const backUp = {
      lists: { ...lists },
      tasks: { ...tasks },
    };

    const destId = Number(destination.droppableId);
    const sourceId = Number(source.droppableId);

    // 同じ場所なら何もしない
    if (destId === sourceId && destination.index === source.index) {
      return;
    }

    const start = lists[sourceId];
    const finish = lists[destId];

    let newOrder = 0;
    // 先頭に移動する場合
    if (destination.index === 0) {
      if (finish.Task.length) {
        newOrder = tasks[finish.Task[0]].order / 2;
      } else {
        newOrder = DEFAULT_ORDER;
      }
    }
    // 末尾に移動する場合
    else if (destination.index === finish.Task.length) {
      newOrder = tasks[finish.Task.slice(-1)[0]].order + DEFAULT_ORDER;
    }
    // それ以外
    else {
      // 移動後にあったタスク
      const nextTask = tasks[finish.Task[destination.index]];

      // 同じリストで後ろへの移動の場合、計算対象を変える
      const prevIdx =
        sourceId === destId && source.index < destination.index
          ? destination.index + 1
          : destination.index - 1;

      // 移動先の隣のタスク（orderの計算対象）
      const prevTask = tasks[finish.Task[prevIdx]];

      newOrder = (nextTask.order + prevTask.order) / 2;
    }

    // 同じリスト内の場合
    if (start === finish) {
      const newTaskIds = [...start.Task];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, taskId);

      const newColumn = {
        ...start,
        Task: newTaskIds,
      };

      const newLists = {
        ...lists,
        [newColumn.id]: newColumn,
      };

      setLists(newLists);

      const newTasks = {
        ...tasks,
        [taskId]: { ...tasks[taskId], order: newOrder },
      };
      setTasks(newTasks);
    } else {
      // 別のリストへの移動の場合
      // 移動元からタスクを削除
      const startTaskIds = Array.from(start.Task);
      startTaskIds.splice(source.index, 1);

      // 新しい移動元リスト
      const newStart = {
        ...start,
        Task: startTaskIds,
      };

      // 移動先にタスクを追加
      const finishTaskIds = Array.from(finish.Task);
      finishTaskIds.splice(destination.index, 0, taskId);
      const newFinish = {
        ...finish,
        Task: finishTaskIds,
      };

      // 新しいリスト一覧
      const newLists = {
        ...lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };

      setLists(newLists);

      const newTasks = {
        ...tasks,
        [taskId]: { ...tasks[taskId], listId: destId, order: newOrder },
      };
      setTasks(newTasks);
    }

    try {
      await updateTaskApi(taskId, { listId: destId, order: newOrder });
    } catch (e) {
      setLists(backUp.lists);
      setTasks(backUp.tasks);
    }
  };

  const listDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // 通信エラー時にロールバックするため現在の状態を保管
    const backUp = {
      lists: { ...lists },
      listIds: [...listIds],
    };

    const sourceId = listIds[source.index];
    const sourceList = { ...lists[sourceId] };

    let newOrder = 0;
    // 先頭に移動する場合
    if (destination.index === 0) {
      newOrder = lists[listIds[0]].order / 2;
    }
    // 末尾に移動する場合
    else if (destination.index === listIds.length - 1) {
      newOrder = lists[listIds.slice(-1)[0]].order + DEFAULT_ORDER;
    }
    // それ以外
    else {
      // 移動先にあったリスト
      const prevDestList = lists[listIds[destination.index]];

      // 後ろor前への移動で計算対象を変える
      const nextIdx =
        source.index < destination.index
          ? destination.index + 1
          : destination.index - 1;

      // 移動先の隣のリスト（orderの計算対象）
      const nextList = lists[listIds[nextIdx]];
      newOrder = (prevDestList.order + nextList.order) / 2;
    }

    const newListIds = [...listIds];
    newListIds.splice(source.index, 1);

    newListIds.splice(destination.index, 0, Number(draggableId));

    setListIds(newListIds);

    const newLists = {
      ...lists,
      [sourceList.id]: { ...sourceList, order: newOrder },
    };
    setLists(newLists);

    try {
      // 描画の問題から後でバックエンドでもデータ更新
      await updateTaskListApi(sourceList.id, { order: newOrder });
    } catch (e) {
      setListIds(backUp.listIds);
      setLists(backUp.lists);
    }
  };

  // ドラッグ終了ハンドラ
  const handleDragEnd: OnDragEndResponder = (result, provided) => {
    switch (result?.type) {
      case DND_TYPE.TASK:
        taskDragEnd(result);
        break;
      case DND_TYPE.LIST:
        listDragEnd(result);
        break;
      default:
        break;
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
