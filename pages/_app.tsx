import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../store/auth/AuthContext';
import Layout from '../components/layouts/Layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
