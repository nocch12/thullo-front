import { VFC } from 'react';
import { Flex, Avatar, Box, AvatarProps } from '@chakra-ui/react';

const Account: VFC<AvatarProps> = ({ children, ...props }) => {
  return (
    <Flex alignItems="center">
      <Avatar mr="2" {...props} size="sm" />
      <Box>{children}</Box>
    </Flex>
  );
};

export default Account;
