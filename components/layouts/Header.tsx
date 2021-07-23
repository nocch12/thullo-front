import { Flex, Box, Container } from '@chakra-ui/react';
import Menu from './Menu';

const Header = () => {
  return (
    <Container maxWidth="container.xl" py={2}>
      <Flex as="header" alignItems="center" justifyContent="space-between">
        <Box>header</Box>
        <Flex>
          <Menu />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
