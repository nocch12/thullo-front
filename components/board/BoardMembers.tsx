import { Container, HStack, Flex, Box, Avatar } from '@chakra-ui/react';

const BoardMembers = () => {
  return (
    <HStack
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {Array(20)
        .fill(1)
        .map((item, i) => (
          <Avatar
            key={i}
            size="sm"
            name="Oshigaki Kisame"
            src="https://bit.ly/broken-link"
          />
        ))}
    </HStack>
  );
};

export default BoardMembers;
