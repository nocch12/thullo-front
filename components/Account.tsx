import { Flex, Avatar, Box, AvatarProps } from '@chakra-ui/react';
import { VFC } from 'react';

const Account: VFC<AvatarProps> = ({ children, ...props }) => {
  return (
    <Flex alignItems="center">
      <Avatar mr="2" {...props} size="sm" />
      <Box>{children}</Box>
    </Flex>
  );
};

export default Account;
