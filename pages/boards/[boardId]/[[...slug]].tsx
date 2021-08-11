import { Icon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Flex,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { VFC, useState, useEffect, useCallback } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { getBoardDetail, updateBoardPublished } from '../../../api/board';
import BoardDrawer from '../../../components/board/BoardDrawer/BoardDrawer';
import BoardMembers from '../../../components/board/BoardMembers';
import PublicityButton from '../../../components/board/PublicityButton';
import TaskList from '../../../components/task/TaskList';
import TaskModal from '../../../components/task/TaskModal/TaskModal';
import { Board } from '../../../types/board';

const boardTop: VFC = () => {
  const [taskId, setTaskId] = useState('');
  const [board, setBoard] = useState<Board>(null);
  const { query } = useRouter();
  const { boardId, slug } = query;

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await getBoardDetail(Number(boardId));
        setBoard(res.data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    getDetail();
  }, [boardId]);

  useEffect(() => {
    if (Array.isArray(slug)) {
      setTaskId(slug[0]);
    } else {
      setTaskId('');
    }
  }, [slug]);

  const handleChangePublicity = useCallback(async () => {
    try {
      const id = Number(boardId);
      const res = await updateBoardPublished(id, !board?.published);

      setBoard(res.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }, [boardId, board?.published]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      maxWidth="container.xl"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Flex alignItems="center" mb="4">
        <PublicityButton
          mr="2"
          isPublic={board?.published}
          onClick={handleChangePublicity}
        />
        <BoardMembers />
        <Button
          ml="2"
          size="sm"
          minW="fit-content"
          leftIcon={<Icon as={MdMoreHoriz} />}
          onClick={onOpen}
          bgColor=""
        >
          メニュー
        </Button>
        <BoardDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
      <HStack
        overflowX="auto"
        spacing={4}
        flexGrow={1}
        alignItems="flex-start"
        bgColor="teal.50"
        p="4"
        rounded="md"
      >
        <TaskList />
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
      </HStack>
      {typeof taskId === 'string' && <TaskModal taskId={taskId} />}
    </Container>
  );
};

export default boardTop;
