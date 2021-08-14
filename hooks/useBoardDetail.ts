import {
  getBoardDetail as getApi,
  updateBoard as updateApi,
  removeBoardUser as removeBoardUserApi,
  inviteBoardUser as inviteBoardUserApi,
} from '../api/board';
import { boardState, boardUserState } from '../store/board';
import { Board, BoardUser, UpdateParams } from '../types/board';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const useBoardDetail = () => {
  const [loading, setLoading] = useState(false);
  const [boardDetail, setBoardDetail] = useRecoilState(boardState);
  const [boardUsers, setBoardUsers] = useRecoilState(boardUserState);

  const boardUserIds = boardUsers.map((u) => u.id);

  // ボード詳細取得
  const getBoardDetail = async (id: Board['id']) => {
    setLoading(true);
    try {
      const res = await getApi(id);
      setBoardDetail(res.data);
      setBoardUsers(res.data.users);
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // ボード更新
  const updateBoard = async (params: UpdateParams) => {
    setLoading(true);
    try {
      const res = await updateApi(boardDetail.id, params);
      setBoardDetail(res.data);
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // ボードメンバー除外
  const removeUser = async (id: BoardUser['id']) => {
    setLoading(true);
    try {
      await removeBoardUserApi(id);
      setBoardUsers((prev) => {
        return prev.filter((u) => u.id !== id);
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // ボードメンバー追加
  const addUsers = async (ids: BoardUser['id'][]) => {
    setLoading(true);
    try {
      const res = await inviteBoardUserApi(boardDetail.id, ids);
      setBoardUsers(res.data.users);
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 公開設定更新
  const togglePublished = async () => {
    await updateBoard({ published: !boardDetail.published });
  };

  return {
    loading,
    boardDetail,
    boardUsers,
    boardUserIds,
    getBoardDetail,
    updateBoard,
    togglePublished,
    removeUser,
    addUsers,
  };
};

export default useBoardDetail;
