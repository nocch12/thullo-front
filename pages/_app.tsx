import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../store/auth/AuthContext';
import Layout from '../components/layouts/Layout';

import { getCsrf } from '../api/csrf';
import { axios } from '../libs/axios';

const MyApp = ({ Component, pageProps }) => {
  const [csrfInit, setCsrfInit] = useState(false);
  const [authInit, setAuthInit] = useState(false);

  useEffect(() => {
    const csrf = async () => {
      const { data } = await getCsrf();
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
      setCsrfInit(true);
    }
    csrf();
  }, []);

  return csrfInit && authInit ? (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  ) : null;
};

export default MyApp;
