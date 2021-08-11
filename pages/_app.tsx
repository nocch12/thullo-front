import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import Layout from '../components/layouts/Layout';
import Initialize from '../middleware/Initialize';


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
