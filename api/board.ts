import { axios } from '../libs/axios';
import { Board, BoardUser, UpdateParams } from '../types/board';

// ボード一覧取得
export const searchBoard = (search?: string | undefined) => {
  return axios.get<Board[]>('/board', {
    params: {
      search,
    },
  });
};

// ボード詳細取得
export const getBoardDetail = async (boardId: number) => {
  return axios.get<Board>(`/board/${boardId}`);
};

// ボード追加
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

// ボード更新
export const updateBoard = async (
  boardId: number,
  params: UpdateParams = {}
) => {
  return axios.patch<Board>('/board', {
    boardId,
    ...params,
  });
};

// ボードメンバー除外
export const removeBoardUser = async (
  boardId: Board['id'],
  userId: BoardUser['id']
) => {
  return axios.delete<BoardUser>('/board/user', {
    params: {
      boardId,
      userId,
    },
  });
};

// ボードメンバー招待
export const inviteBoardUser = async (
  boardId: Board['id'],
  userIds: BoardUser['id'][]
) => {
  return axios.post<Board>('/board/user', {
    boardId,
    userIds,
  });
};
