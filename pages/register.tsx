import React, { useState } from 'react';
import { Box, Button, Container, Input, Text } from '@chakra-ui/react';

const Register: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <Container as="form" w="container.sm" onSubmit={loginAction}>
      <Text as="h2" fontSize="lg" fontWeight="bold">新規登録</Text>
      <Box mt={4}>
        <Text>メールアドレス</Text>
        <Input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
      </Box>
      <Box mt={4}>
        <Text>パスワード</Text>
        <Input value={password} onInput={(e) => setPassword(e.currentTarget.value)} />
      </Box>
      <Box mt={6}>
        <Button type="submit" colorScheme="teal" w="full">
          新規登録
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
