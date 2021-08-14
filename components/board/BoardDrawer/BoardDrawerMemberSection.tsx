import useBoardDetail from '../../../hooks/useBoardDetail';
import Account from '../../Account';
import { Icon } from '@chakra-ui/icons';
import { Flex, Text, Table, Tbody, Tr, Td, Button } from '@chakra-ui/react';
import { VFC } from 'react';
import { MdDescription } from 'react-icons/md';

type TMemberTr = {
  imagePath?: string;
  memberName: string;
  isAdmin: unknown;
  onRemove: () => void;
  loading: boolean;
};

const MemberTr: VFC<TMemberTr> = ({
  imagePath,
  memberName,
  isAdmin,
  onRemove,
  loading,
}) => {
  return (
    <Tr>
      <Td pl="0" w="full">
        <Account name={memberName} src={imagePath}>
          <Text>{memberName}</Text>
        </Account>
      </Td>
      <Td pr="0" textAlign="center">
        {isAdmin ? (
          <Text fontSize="xs" color="gray">
            admin
          </Text>
        ) : (
          <Button
            size="xs"
            colorScheme="red"
            variant="outline"
            onClick={onRemove}
            isLoading={loading}
          >
            remove
          </Button>
        )}
      </Td>
    </Tr>
  );
};

const BoardDrawerMemberSection: VFC = () => {
  const { boardDetail, boardUsers, removeUser, loading } = useBoardDetail();

  const handleRemove = async (id: number) => {
    await removeUser(id);
  };

  return (
    <>
      <Flex alignItems="center" mb="4">
        <Icon as={MdDescription} color="gray" />
        <Text ml="2" color="gray" fontSize="xs">
          メンバー
        </Text>
      </Flex>
      <Table size="sm" variant="unstyled">
        <Tbody>
          {boardUsers.map((u) => (
            <MemberTr
              memberName={u.name}
              imagePath={u.imagePath}
              isAdmin={u.id === boardDetail?.author?.id}
              loading={loading}
              onRemove={() => handleRemove(u.id)}
            />
          ))}
          {/* <MemberTr memberName="tests" isAdmin={true} />
          <MemberTr memberName="tests" isAdmin={false} />
          <MemberTr memberName="tests" isAdmin={false} />
          <MemberTr memberName="tests" isAdmin={false} /> */}
        </Tbody>
      </Table>
    </>
  );
};

export default BoardDrawerMemberSection;
