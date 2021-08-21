import BoardDetailHeader from '../../../components/board/BoardDetailHeader';
import TaskListArea from '../../../components/task/TaskListArea';
import TaskModal from '../../../components/task/TaskModal/TaskModal';
import useBoardDetail from '../../../hooks/useBoardDetail';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { VFC, useState, useEffect } from 'react';

const boardTop: VFC = () => {
  const [taskId, setTaskId] = useState('');
  const { getBoardDetail, resetDetail } = useBoardDetail();
  const { query } = useRouter();
  const { boardId, slug } = query;

  // 詳細情報取得
  useEffect(() => {
    getBoardDetail(Number(boardId));
  }, [boardId]);

  // 詳細情報リセット
  useEffect(() => {
    return () => {
      resetDetail();
    };
  }, []);

  // タスクモーダル展開
  useEffect(() => {
    if (Array.isArray(slug)) {
      setTaskId(slug[0]);
    } else {
      setTaskId('');
    }
  }, [slug]);

  return (
    <Container
      maxWidth="container.xl"
      h="full"
      display="flex"
      flexDirection="column"
      overflowY="auto"
    >
      <BoardDetailHeader />
      <TaskListArea boardId={Number(boardId)} />
      {typeof taskId === 'string' && <TaskModal taskId={taskId} />}
    </Container>
  );
};

export default boardTop;
