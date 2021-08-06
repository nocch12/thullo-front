import { VFC, useState } from 'react';
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
  Spacer,
} from '@chakra-ui/react';
import { AddIcon, AttachmentIcon } from '@chakra-ui/icons';
import PublicityButton from './PublicityButton';
import SearchImage from '../popovers/SearchImage';

const AddBoardModal: VFC<Partial<UseDisclosureReturn>> = ({
  isOpen,
  onClose,
}) => {
  const [publicity, setPublicity] = useState(false);
  const [image, setImage] = useState('');

  const handleChangePublicity = () => setPublicity((oldValue) => !oldValue);

  const handleSelectImage = (url: string) => {
    setImage(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Image
            h="120px"
            w="full"
            objectFit="cover"
            src={image}
            fallbackSrc={image || 'https://via.placeholder.com/150'}
            rounded="md"
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Input mb="6" shadow="md" />
            <Flex justify="space-between">
              <SearchImage onSelectImage={handleSelectImage}>
                <Button
                  colorScheme="gray"
                  leftIcon={<AttachmentIcon />}
                  flexGrow={1}
                  size="sm"
                >
                  Cover
                </Button>
              </SearchImage>
              <Spacer />
              <PublicityButton
                isPublic={publicity}
                onClick={handleChangePublicity}
              />
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose} size="sm">
            キャンセル
          </Button>
          <Button leftIcon={<AddIcon />} colorScheme="teal" size="sm">
            追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
