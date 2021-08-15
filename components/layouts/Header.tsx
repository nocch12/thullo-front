import BoardArea from './BoardArea';
import Menu from './Menu';
import SearchBoard from './SearchBoard';
import {
  Flex,
  Box,
  Container,
  Spacer,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { MdApps } from 'react-icons/md';

const Header = () => {
  return (
    <Container maxWidth="container.xl" py={2} borderBottom={1} shadow="sm">
      <Flex as="header" alignItems="center">
        <Box pr={8}>header</Box>
        <BoardArea />
        <Spacer />
        <HStack spacing={2}>
          <IconButton
            aria-label="all board"
            display={['flex', null, 'none']}
            icon={<MdApps />}
            size="sm"
          />
          <SearchBoard />
          <Menu />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Header;
