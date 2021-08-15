import SearchBoard from '../forms/SearchBoard';
import BoardArea from './BoardArea';
import Menu from './Menu';
import {
  Flex,
  Box,
  Container,
  Spacer,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MdApps, MdSearch } from 'react-icons/md';

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
          <Box display={['flex', null, 'none']}>
            <Link href="/boards/search" passHref>
              <IconButton
                as="a"
                aria-label="search board"
                icon={<MdSearch />}
                size="sm"
              />
            </Link>
          </Box>
          <Box display={['none', null, 'block']}>
            <SearchBoard />
          </Box>
          <Menu />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Header;
