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
import { AddIcon } from '@chakra-ui/icons';
import Board from '../../components/boards/Board';
import AddBoardModal from '../../components/boards/AddBoardModal';

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
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          add
        </Button>
      </Flex>
      <Spacer mb="4" />
      <Wrap spacing="10" justify="space-between" alignItems="center">
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
