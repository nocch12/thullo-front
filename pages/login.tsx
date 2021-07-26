import Head from 'next/head';
import React, { useState } from 'react';
import { Box, Button, Container, Input, Text } from '@chakra-ui/react';
import { useAuthContext } from '../store/auth/AuthContext';
import { login } from '../api/user';

const Login: React.VFC = () => {
  const { setUser } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await login(email, password);

    setUser(data.user);
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

export default Login;
