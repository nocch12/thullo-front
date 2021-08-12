import { axios } from '../libs/axios';
import { Board, UpdateParams } from '../types/board';

export const searchBoard = (q = '') => {
  return axios.get<Board[]>('/board', {
    params: {
      q,
    },
  });
};

export const getBoardDetail = async (boardId: number) => {
  return axios.get<Board>(`/board/${boardId}`);
};

export const addBoard = async (
  boardName: string,
  imagePath: string,
  published: boolean
) => {
  return axios.post<Board>('/board', {
    boardName,
    imagePath,
    published,
  });
};

export const updateBoard = async (
  boardId: number,
  params: UpdateParams = {}
) => {
  return axios.patch<Board>('/board', {
    boardId,
    ...params,
  });
};

export const updateBoardPublished = async (
  boardId: number,
  published: boolean
) => {
  return axios.post<Board>('/board/update/published', {
    boardId,
    published,
  });
};
