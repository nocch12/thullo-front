import { Icon } from '@chakra-ui/icons';
import { Flex, Text, Table, Tbody, Tr, Td, Button } from '@chakra-ui/react';
import { VFC } from 'react';
import { MdDescription } from 'react-icons/md';

import Account from '../../Account';

type TMemberTr = {
  memberName: string;
  isAdmin: unknown;
};

const MemberTr: VFC<TMemberTr> = ({ memberName, isAdmin }) => {
  return (
    <Tr>
      <Td pl="0" w="full">
        <Account>
          <Text>{memberName}</Text>
        </Account>
      </Td>
      <Td pr="0" textAlign="center">
        {isAdmin ? (
          <Text fontSize="xs" color="gray">
            admin
          </Text>
        ) : (
          <Button size="xs" colorScheme="red" variant="outline">
            remove
          </Button>
        )}
      </Td>
    </Tr>
  );
};

const BoardDrawerMemberSection: VFC = () => {
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
          <MemberTr memberName="tests" isAdmin={true} />
          <MemberTr memberName="tests" isAdmin={false} />
          <MemberTr memberName="tests" isAdmin={false} />
          <MemberTr memberName="tests" isAdmin={false} />
        </Tbody>
      </Table>
    </>
  );
};

export default BoardDrawerMemberSection;
