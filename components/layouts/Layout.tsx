import { Flex, Box } from '@chakra-ui/react';
import { VFC } from 'react';

import Footer from './Footer';
import Header from './Header';

type Props = {
  children: JSX.Element;
};

const Layout: VFC<Props> = ({ children }) => {
  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Box as="main" flexGrow={1} pt={6}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
