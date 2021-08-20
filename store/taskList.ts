import { atom, selectorFamily } from 'recoil';
import { TTaskList, TTaskListOrder, TTaskLists } from '../types/taskList';

export const taskListsState = atom<TTaskLists>({
  key: 'taskList/list',
  default: {},
});

export const taskListsOrderState = atom<TTaskListOrder>({
  key: 'taskList/order',
  default: [],
});

// export const taskListSelector = selectorFamily<TTaskList, TTaskList['id']>({
//   key: 'taskList/one',
//   get:
//     (listId) =>
//     ({ get }) => {
//       const lists = get(taskListsState);
//       return lists.find((l) => l.id === listId);
//     },
//   set:
//     (listId) =>
//     ({ get, set }, newList) => {
//       const lists = get(taskListsState);
//       const idx = lists.findIndex((l) => l.id === listId);
//       const newLists = [...lists];
//       newLists.splice(idx, 1, newList as TTaskList);
//       set(taskListsState, newLists);
//     },
// });
