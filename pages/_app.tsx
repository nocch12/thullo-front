import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import Initialize from '../middleware/Initialize';
import Layout from '../components/layouts/Layout';


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
