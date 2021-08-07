import React from 'react';
import NextLink from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Image,
  Heading,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react';

const Board = () => {
  return (
    <LinkBox shadow="md" rounded="md" maxW="300px" p={2}>
      <Image
        h="150px"
        w="full"
        src="gibbresh.png"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Heading as="h5" fontSize="lg" py="2" isTruncated>
        <NextLink href="/boards/t" passHref>
          <LinkOverlay>testfaefefawefwafefaefeafewaf</LinkOverlay>
        </NextLink>
      </Heading>
      <AvatarGroup size="sm" max={2}>
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      </AvatarGroup>
    </LinkBox>
  );
};

export default Board;
