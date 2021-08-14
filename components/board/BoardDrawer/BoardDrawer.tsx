import useBoardDetail from '../../../hooks/useBoardDetail';
import Account from '../../Account';
import BoardDrawerDescriotionSection from './BoardDrawerDescriotionSection';
import BoardDrawerMemberSection from './BoardDrawerMemberSection';
import { Icon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from '@chakra-ui/react';
import { VFC } from 'react';
import { MdAccountCircle } from 'react-icons/md';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const BoardDrawer: VFC<Props> = ({ isOpen, onClose }) => {
  const { boardDetail } = useBoardDetail();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader px="4" fontSize="md" shadow="sm">
          {boardDetail?.boardName}
        </DrawerHeader>

        <DrawerBody px="4">
          <Box mb="6">
            <Flex alignItems="center" mb="4">
              <Icon as={MdAccountCircle} color="gray" />
              <Text ml="2" color="gray" fontSize="xs">
                作成者
              </Text>
            </Flex>
            <Box>
              <Account
                name={boardDetail?.author?.name}
                src={boardDetail?.author?.imagePath}
              >
                <Text>{boardDetail?.author?.name}</Text>
                <Text as="time" fontSize="xs" color="gray">
                  {boardDetail?.createdAt}
                </Text>
              </Account>
            </Box>
          </Box>

          <Box mb="6">
            <BoardDrawerDescriotionSection />
          </Box>

          <Box mb="6">
            <BoardDrawerMemberSection />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default BoardDrawer;
