import {Icon} from '@chakra-ui/icons';
import {
  AvatarGroup,
  Avatar,
  Box,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Wrap,
  WrapItem,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MdAttachFile, MdComment } from 'react-icons/md';

const TaskCard = () => {
  return (
    <LinkBox p="2" w="full" shadow="sm" bg="white" rounded="md">
      {/* 画像 */}
      <Image
        h="100px"
        w="full"
        src="gibbresh.png"
        fallbackSrc="https://via.placeholder.com/150"
        rounded="md"
        mb="2"
      />
      {/* タイトル */}
      <Link href="/boards/b/t" passHref>
        <LinkOverlay>
          <Text mb="2" fontWeight="bold">
            title
          </Text>
        </LinkOverlay>
      </Link>
      {/* タグ */}
      <Wrap spacing="1" mb="2">
        <WrapItem>
          <Badge fontWeight="normal">test</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>test</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>test</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>test</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>test</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>test</Badge>
        </WrapItem>
      </Wrap>
      <Flex alignItems="center" justify="space-between">
        {/* メンバー */}
        <Box>
          <AvatarGroup size="sm" max={3}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </Box>
        {/* コメント、ファイル */}
        <Flex justify="flex-end" alignItems="center" fontSize="xs" color="gray">
            <Icon as={MdComment} />
            <Text ml="1">2</Text>
            <Icon ml="2" as={MdAttachFile} />
            <Text ml="1">2</Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default TaskCard;
