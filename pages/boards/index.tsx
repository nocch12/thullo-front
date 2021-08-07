import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Wrap,
  WrapItem,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdAdd } from 'react-icons/md';
import Board from '../../components/board/Board';
import AddBoardModal from '../../components/board/AddBoardModal';

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container maxW="container.lg">
      <AddBoardModal isOpen={isOpen} onClose={onClose} />

      <Flex alignItems="center">
        <Heading as="h3" fontSize="md">
          All Boards
        </Heading>
        <Spacer />
        <Button
          leftIcon={<Icon as={MdAdd} />}
          colorScheme="teal"
          size="sm"
          onClick={onOpen}
        >
          新規作成
        </Button>
      </Flex>
      <Spacer mb="4" />
      <Wrap spacing="10" justify="space-around" alignItems="center">
        <WrapItem>
          <Board />
        </WrapItem>
        <WrapItem>
          <Board />
        </WrapItem>
        <WrapItem>
          <Board />
        </WrapItem>
        <WrapItem>
          <Board />
        </WrapItem>
        <WrapItem>
          <Box w="260px" />
        </WrapItem>
        <WrapItem>
          <Box w="260px" />
        </WrapItem>
      </Wrap>
    </Container>
  );
};

export default index;
