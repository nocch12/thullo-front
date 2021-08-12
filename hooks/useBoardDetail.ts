import {
  getBoardDetail as getApi,
  updateBoard as updateApi,
  updateBoardPublished as upPublishedApi,
} from '../api/board';
import { boardState, boardUserState } from '../store/board';
import { Board, UpdateParams } from '../types/board';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const useBoardDetail = () => {
  const [loading, setLoading] = useState(false);
  const [boardDetail, setBoardDetail] = useRecoilState(boardState);
  const [boardUsers, setBoardUsers] = useRecoilState(boardUserState);

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

  // const togglePublished = async () => {
  //   setLoading(true);
  //   console.log(boardDetail);

  //   try {
  //     const res = await upPublishedApi(boardDetail.id, !boardDetail.published);
  //     setBoardDetail(res.data);
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const togglePublished = async () => {
    await updateBoard({ published: !boardDetail.published });
  };

  return {
    loading,
    boardDetail,
    boardUsers,
    getBoardDetail,
    updateBoard,
    togglePublished,
  };
};

export default useBoardDetail;
