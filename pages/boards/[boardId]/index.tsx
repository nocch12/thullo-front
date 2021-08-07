import { useRef } from 'react';
import {
  Container,
  HStack,
  Flex,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import {MdMoreHoriz} from 'react-icons/md';
import PublicityButton from '../../../components/board/PublicityButton';

import BoardMembers from '../../../components/board/BoardMembers';
import BoardDrawer from '../../../components/board/BoardDrawer/BoardDrawer';

const boardTop = () => {
  const handleChangePublicity = () => {};
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxWidth="container.xl" h="full">
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
          leftIcon={<Icon as={MdMoreHoriz} />}
          onClick={onOpen}
        >
          メニュー
        </Button>
        <BoardDrawer isOpen={isOpen} onClose={onClose} />
      </Flex>
      <HStack h="full" overflowX="auto" spacing={4} alignItems="flex-start">
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
        <Box minW="200px">a</Box>
      </HStack>
    </Container>
  );
};

export default boardTop;
