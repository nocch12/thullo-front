import {
  LinkBox,
  LinkOverlay,
  Image,
  Heading,
  AvatarGroup,
  Avatar,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { VFC } from 'react';

import { BoardUser } from '../../types/board';

type Props = {
  boardId: number;
  boardName: string;
  imagePath: string;
  users: BoardUser[];
};

const Board: VFC<Props> = ({ boardId, boardName, imagePath, users = [] }) => {
  const href = `/boards/${boardId}`;

  return (
    <LinkBox shadow="md" rounded="md" w="300px" p={2}>
      <Image
        h="150px"
        w="full"
        src={imagePath}
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Heading as="h5" fontSize="lg" py="2" isTruncated>
        <NextLink href={href} passHref>
          <LinkOverlay>{boardName}</LinkOverlay>
        </NextLink>
      </Heading>
      <AvatarGroup size="sm" max={5}>
        {users.map(u => <Avatar name={u.name} src={u.imagePath} key={u.id} />)}
      </AvatarGroup>
    </LinkBox>
  );
};

export default Board;
