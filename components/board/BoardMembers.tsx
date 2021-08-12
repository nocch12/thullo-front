import { TSimpleUser } from '../../types/user';
import { HStack, Avatar } from '@chakra-ui/react';
import { VFC } from 'react';

type Props = {
  users: TSimpleUser[];
};

const BoardMembers: VFC<Props> = ({ users }) => {
  return (
    <HStack
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {users?.map((u) => (
        <Avatar key={u.id} size="sm" name={u.name} src={u.imagePath || null} />
      ))}
    </HStack>
  );
};

export default BoardMembers;
