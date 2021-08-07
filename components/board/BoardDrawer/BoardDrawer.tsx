import { VFC } from 'react';
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
import { Icon } from '@chakra-ui/icons';
import { MdAccountCircle } from 'react-icons/md';
import Account from '../../Account';
import BoardDrawerDescriotionSection from './BoardDrawerDescriotionSection';
import BoardDrawerMemberSection from './BoardDrawerMemberSection';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const BoardDrawer: VFC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader px="4" fontSize="md" shadow="sm">
          ボード名
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
              <Account>
                <Text>test</Text>
                <Text fontSize="xs" color="gray">
                  2021/08/21
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
