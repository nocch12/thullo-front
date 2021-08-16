import Footer from './Footer';
import Header from './Header';
import { Flex, Box } from '@chakra-ui/react';
import { VFC } from 'react';

type Props = {
  children: JSX.Element;
};

const Layout: VFC<Props> = ({ children }) => {
  return (
    <Flex
      h="100vh"
      minW="100vh"
      maxH="100vh"
      flexDirection="column"
      overflowY="hidden"
    >
      <Header />
      <Box as="main" flexGrow={1} pt={6} overflowY="auto">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
