import { Box, Button, Container, Input, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';

import withoutAuth from '..//middleware/withoutAuth';
import useLogin from '../hooks/useLogin';

const Login: React.VFC = () => {
  const { login, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container as="form" w="container.sm" onSubmit={loginAction}>
      <Head>
        <title>Login</title>
      </Head>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        ログイン
      </Text>
      <Box mt={4}>
        <Text>メールアドレス</Text>
        <Input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
      </Box>
      <Box mt={4}>
        <Text>パスワード</Text>
        <Input
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
      </Box>
      <Box mt={6}>
        <Button type="submit" colorScheme="teal" w="full">
          ログイン
        </Button>
      </Box>
    </Container>
  );
};

export default withoutAuth(Login);
