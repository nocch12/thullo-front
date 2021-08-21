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

  //   // 移動元リスト
  //   const sourceListIdx = lists.findIndex((l) => l.id === sourceId);

  //   const newSourceTasks = [...lists[sourceListIdx].Task];
  //   // 移動対象タスク
  //   const [task] = newSourceTasks.splice(source.index, 1);
  //   if (destId === sourceId) {
  //     newSourceTasks.splice(destination.index, 0, task);
  //     const newSourceList: TTaskList = {
  //       ...lists[sourceListIdx],
  //       Task: newSourceTasks,
  //     };
  //     const newLists = [...lists];
  //     newLists.splice(sourceListIdx, 1, newSourceList);
  //     setLists(newLists);
  //     setCurrentDraggingTask('');
  //     return;
  //   }

  //   const newSourceList: TTaskList = {
  //     ...lists[sourceListIdx],
  //     Task: newSourceTasks,
  //   };

  //   // 移動先リスト
  //   const targetListIdx = lists.findIndex((l) => l.id === destId);
  //   const newTargetTasks = [...lists[targetListIdx].Task];
  //   newTargetTasks.splice(destination.index, 0, task);
  //   const newTargetList: TTaskList = {
  //     ...lists[targetListIdx],
  //     Task: newTargetTasks,
  //   };

  //   const newLists = [...lists];
  //   newLists.splice(sourceListIdx, 1, newSourceList);
  //   newLists.splice(targetListIdx, 1, newTargetList);
  //   setLists(newLists);

  //   setCurrentDraggingTask('');
  // };

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

  return {
    taskDragStart,
    isCurrentDragging,
    handleDragStart,
    handleDragEnd,
  };
};

export default useDND;
