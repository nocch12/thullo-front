import { VFC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

const Layout: VFC<Props> = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Box as="main" flexGrow={1} pt={6}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
