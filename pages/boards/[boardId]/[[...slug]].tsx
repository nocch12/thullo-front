import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  HStack,
  Flex,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdMoreHoriz } from 'react-icons/md';
import PublicityButton from '../../../components/board/PublicityButton';

import BoardMembers from '../../../components/board/BoardMembers';
import BoardDrawer from '../../../components/board/BoardDrawer/BoardDrawer';
import TaskList from '../../../components/task/TaskList';
import TaskModal from '../../../components/task/TaskModal/TaskModal';

const boardTop = () => {
  const [taskId, setTaskId] = useState('');
  const { query } = useRouter();
  const { boardId, slug } = query;

  useEffect(() => {
    if (Array.isArray(slug)) {
      setTaskId(slug[0]);
    } else {
      setTaskId('');
    }
  }, [slug]);

  const handleChangePublicity = () => {};
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
          isPublic={false}
          onClick={handleChangePublicity}
        />
        <BoardMembers />
        <Button
          ml="2"
          size="sm"
          minW="fit-content"
          leftIcon={<Icon as={MdMoreHoriz} />}
          onClick={onOpen}
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
