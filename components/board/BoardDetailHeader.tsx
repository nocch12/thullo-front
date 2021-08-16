import useBoardDetail from '../../hooks/useBoardDetail';
import SearchUserPopover from '../popovers/SearchUserPopover';
import BoardDrawer from './BoardDrawer/BoardDrawer';
import BoardMembers from './BoardMembers';
import PublicityButton from './PublicityButton';
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { StringOrNumber } from '@chakra-ui/utils';
import React from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';

const BoardDetailHeader = () => {
  const {
    boardDetail,
    boardUsers,
    boardUserIds,
    addUsers,
    togglePublished,
    loading,
  } = useBoardDetail();

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
  );
};

export default BoardDetailHeader;
