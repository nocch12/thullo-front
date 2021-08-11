import { Box, Button, Container, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import withoutAuth from '..//middleware/withoutAuth';
import useRegister from '../hooks/useRegister';

const Register: React.VFC = () => {
  const { register, error } = useRegister();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerAction = async (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <Container as="form" w="container.sm" onSubmit={registerAction}>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        新規登録
      </Text>
      <Box mt={4}>
        <Text>ニックネーム</Text>
        <Input value={name} onInput={(e) => setName(e.currentTarget.value)} />
      </Box>
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
          新規登録
        </Button>
      </Box>
    </Container>
  );
};

export default withoutAuth(Register);
