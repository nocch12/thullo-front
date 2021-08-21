import { searchBoard } from '../../api/board';
import AddBoardModal from '../../components/board/AddBoardModal';
import Board from '../../components/board/Board';
import withAuth from '../../middleware/withAuth';
import { Board as TBoard } from '../../types/board';
import { Icon } from '@chakra-ui/icons';
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
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boards, setBoards] = useState<TBoard[]>([]);
  const { query } = useRouter();
  const searchWord = Array.isArray(query.search)
    ? query.search[0]
    : query.search;

  const headingText = searchWord ? `検索: ${searchWord}` : '全てのボード';

  useEffect(() => {
    handleReload();
  }, [searchWord]);

  const handleReload = async () => {
    try {
      const res = await searchBoard(searchWord);
      setBoards(res.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <Container maxW="container.lg">
      <AddBoardModal isOpen={isOpen} onClose={onClose} onAdded={handleReload} />

      <Flex alignItems="center">
        <Heading as="h3" fontSize="md">
          {headingText}
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
        {boards.map((b) => (
          <WrapItem key={b.id}>
            <Board
              boardId={b.id}
              boardName={b.boardName}
              imagePath={b.imagePath}
              users={b.users}
            />
          </WrapItem>
        ))}
        <WrapItem>
          <Box w="300px" />
        </WrapItem>
        <WrapItem>
          <Box w="300px" />
        </WrapItem>
      </Wrap>
    </Container>
  );
};

export default withAuth(index);
