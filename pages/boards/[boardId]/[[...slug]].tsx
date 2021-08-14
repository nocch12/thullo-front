import { inviteBoardUser } from '../../../api/board';
import BoardDrawer from '../../../components/board/BoardDrawer/BoardDrawer';
import BoardMembers from '../../../components/board/BoardMembers';
import PublicityButton from '../../../components/board/PublicityButton';
import SearchUserPopover from '../../../components/popovers/SearchUserPopover';
import TaskList from '../../../components/task/TaskList';
import TaskModal from '../../../components/task/TaskModal/TaskModal';
import useBoardDetail from '../../../hooks/useBoardDetail';
import { Icon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Flex,
  Box,
  Button,
  useDisclosure,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { StringOrNumber } from '@chakra-ui/utils';
import { useRouter } from 'next/router';
import { VFC, useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';

const boardTop: VFC = () => {
  const [taskId, setTaskId] = useState('');
  const {
    boardDetail,
    getBoardDetail,
    boardUsers,
    boardUserIds,
    addUsers,
    togglePublished,
    loading,
  } = useBoardDetail();
  const { query } = useRouter();
  const { boardId, slug } = query;

  // 詳細情報取得
  useEffect(() => {
    getBoardDetail(Number(boardId));
  }, [boardId]);

  // タスクモーダル展開
  useEffect(() => {
    if (Array.isArray(slug)) {
      setTaskId(slug[0]);
    } else {
      setTaskId('');
    }
  }, [slug]);

  // 公開非公開設定
  const handleChangePublicity = async () => {
    try {
      togglePublished();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  // メンバー招待
  const inviteUser = async (checked: StringOrNumber[]) => {
    const res = await addUsers(checked.map((c) => Number(c)));
    return res;
  };

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
          isPublic={boardDetail?.published}
          isLoading={loading}
          onClick={handleChangePublicity}
        />
        <BoardMembers users={boardUsers} />
        <SearchUserPopover
          onInvite={inviteUser}
          inviting={loading}
          excludeUserIds={boardUserIds}
        >
          <IconButton
            aria-label="join user"
            icon={<MdAdd />}
            colorScheme="teal"
            size="sm"
            ml={2}
          />
        </SearchUserPopover>
        <Spacer />
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
