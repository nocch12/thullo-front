import { VFC } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  UseDisclosureReturn,
  Image,
  Spacer
} from '@chakra-ui/react';
import {
  AddIcon,
  AttachmentIcon,
  LockIcon,
  UnlockIcon,
} from '@chakra-ui/icons';

const AddBoardModal: VFC<Partial<UseDisclosureReturn>> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Image
            h="120px"
            w="100%"
            objectFit="cover"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/150"
            rounded="md"
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Input mb="6" shadow="md" />
            <Flex justify="space-between">
              <Button
                colorScheme="gray"
                leftIcon={<AttachmentIcon />}
                flexGrow={1}
              >
                Cover
              </Button>
              <Spacer />
              <Button colorScheme="gray" leftIcon={<LockIcon />} flexGrow={1}>
                Private
              </Button>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button leftIcon={<AddIcon />} colorScheme="teal">
            追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
