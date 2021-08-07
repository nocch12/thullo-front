import { VFC } from 'react';
import {
  Container,
  HStack,
  Flex,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text
} from '@chakra-ui/react';

type Props = {
 isOpen: boolean;
 onClose(): void;
}

const BoardDrawer: VFC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="md" shadow="sm">ボード名</DrawerHeader>

            <DrawerBody>
              <Box>
                <Flex alignItems="center">
                  <Text colorScheme="gray" size="xs">created by</Text>
                </Flex>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
  )
}

export default BoardDrawer
