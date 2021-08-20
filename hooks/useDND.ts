import { useState } from 'react';
import {
  OnDragEndResponder,
  OnDragStartResponder,
  Id,
  DraggableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { currentDraggingTaskState } from '../store/task';
import { DND_PREFIX, DND_TYPE, TDND_TYPE } from '../config/const';
import usetaskList from './useTaskList';
import { taskListsState } from '../store/taskList';
import { TTaskList } from '../types/taskList';

const useDND = () => {
  const [lists, setLists] = useRecoilState(taskListsState);
  const [currentDraggingTask, setCurrentDraggingTask] = useRecoilState(
    currentDraggingTaskState
  );

  // ドラッグ開始処理
  const taskDragStart = (draggableId: Id) => {
    setCurrentDraggingTask(draggableId);
  };

  // ドラッグ終了処理
  const taskDragEnd = (result: DropResult) => {
    console.log('start', { lists });

    const { destination, source } = result;
    const destId = replaceId(destination.droppableId);
    const sourceId = replaceId(source.droppableId);

    // 移動元リスト
    const sourceListIdx = lists.findIndex((l) => l.id === sourceId);

    const newSourceTasks = [...lists[sourceListIdx].Task];
    // 移動対象タスク
    const [task] = newSourceTasks.splice(source.index, 1);
    if (destId === sourceId) {
      newSourceTasks.splice(destination.index, 0, task);
      const newSourceList: TTaskList = {
        ...lists[sourceListIdx],
        Task: newSourceTasks,
      };
      const newLists = [...lists];
      newLists.splice(sourceListIdx, 1, newSourceList);
      setLists(newLists);
      setCurrentDraggingTask('');
      return;
    }

    const newSourceList: TTaskList = {
      ...lists[sourceListIdx],
      Task: newSourceTasks,
    };

    // 移動先リスト
    const targetListIdx = lists.findIndex((l) => l.id === destId);
    const newTargetTasks = [...lists[targetListIdx].Task];
    newTargetTasks.splice(destination.index, 0, task);
    const newTargetList: TTaskList = {
      ...lists[targetListIdx],
      Task: newTargetTasks,
    };

    const newLists = [...lists];
    newLists.splice(sourceListIdx, 1, newSourceList);
    newLists.splice(targetListIdx, 1, newTargetList);
    setLists(newLists);

    setCurrentDraggingTask('');
  };

  // 現在ドラッグ中かどうか
  const isCurrentDragging = (draggableId: Id) =>
    currentDraggingTask === draggableId;

  // ドラッグ開始ハンドラ
  const handleDragStart: OnDragStartResponder = (initial, provided) => {
    const { draggableId, type } = initial;

    if (type === DND_TYPE.TASK) {
      taskDragStart(draggableId);
    }
  };

  // ドラッグ終了ハンドラ
  const handleDragEnd: OnDragEndResponder = (result, provided) => {
    console.log(result);

    if (result.type === DND_TYPE.TASK) {
      taskDragEnd(result);
    }
  };

  // id作成
  const createDroppableId = (type: TDND_TYPE, id: Id | number) =>
    `${DND_PREFIX.DROP}-${type}-${id}`;
  const createDraggableId = (type: TDND_TYPE, id: Id | number) =>
    `${DND_PREFIX.DRAG}-${type}-${id}`;

  // idの数値のみ抜き出し
  const replaceId = (id: string) => {
    const listDropIdPrefix = createDroppableId('LIST', '');
    const taskDropIdPrefix = createDroppableId('TASK', '');
    const listDragIdPrefix = createDraggableId('LIST', '');
    const taskDragIdPrefix = createDraggableId('TASK', '');

    const replaced = id
      .replace(listDropIdPrefix, '')
      .replace(taskDropIdPrefix, '')
      .replace(listDragIdPrefix, '')
      .replace(taskDragIdPrefix, '');

    return Number(replaced);
  };

  return {
    taskDragStart,
    isCurrentDragging,
    handleDragStart,
    handleDragEnd,
    createDroppableId,
    createDraggableId,
    replaceId,
  };
};

export default useDND;
