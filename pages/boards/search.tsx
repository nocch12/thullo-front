import SearchBoard from '../../components/forms/SearchBoard';
import { Center, Container } from '@chakra-ui/react';
import React from 'react';

const search = () => {
  return (
    <Container maxW="container.lg">
      <Center>
        <SearchBoard />
      </Center>
    </Container>
  );
};

export default search;
