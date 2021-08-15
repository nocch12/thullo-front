import Layout from '../components/layouts/Layout';
import Initialize from '../middleware/Initialize';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Initialize>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Initialize>
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default MyApp;
