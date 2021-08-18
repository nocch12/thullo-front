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

const useDND = () => {
  const [currentDraggingTask, setCurrentDraggingTask] = useRecoilState(
    currentDraggingTaskState
  );

  const taskDragStart = (draggableId: Id) => {
    setCurrentDraggingTask(draggableId);
    const el: HTMLElement = document.querySelector(
      `[data-rbd-draggable-id="${draggableId}"]`
    );
    const trans = el.style.transform;
    el.style.transform = `${trans} rotate(10deg)`;
  };
  const taskDragEnd = (result: DropResult) => {
    setCurrentDraggingTask('');
    const { destination, source } = result;
    const destId = replaceId(destination.droppableId);
    const sourceId = replaceId(source.droppableId);
  };

  const isCurrentDragging = (draggableId: Id) =>
    currentDraggingTask === draggableId;

  const handleDragStart: OnDragStartResponder = (initial, provided) => {
    const { draggableId, type } = initial;

    if (type === DND_TYPE.TASK) {
      taskDragStart(draggableId);
    }
  };

  const handleDragEnd: OnDragEndResponder = (result, provided) => {
    const { draggableId, type, destination, source } = result;

    console.log({ result, provided });

    if (type === DND_TYPE.TASK) {
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
    id.replace(listDropIdPrefix, '')
      .replace(taskDropIdPrefix, '')
      .replace(listDragIdPrefix, '')
      .replace(taskDragIdPrefix, '');

    return Number(id);
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
