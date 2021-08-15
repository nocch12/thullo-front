import useBoardDetail from '../../hooks/useBoardDetail';
import useUser from '../../hooks/useUser';
import { Flex, Box, Divider, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { MdApps } from 'react-icons/md';

const BoardArea = () => {
  const { ifLoggedIn } = useUser();
  const { boardDetail } = useBoardDetail();

  return ifLoggedIn(
    <Flex alignItems="center" display={['none', null, 'flex']}>
      {boardDetail ? <Box mr={6}>{boardDetail.boardName}</Box> : null}
      <Box alignSelf="stretch" mr={6}>
        <Divider orientation="vertical" />
      </Box>
      <Box>
        <Link href="/boards" passHref>
          <Button as="a" leftIcon={<MdApps />} colorScheme="gray" size="sm">
            ボード
          </Button>
        </Link>
      </Box>
    </Flex>
  ) as JSX.Element;
};

export default BoardArea;
