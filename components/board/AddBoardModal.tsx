import { VFC, useState, ChangeEvent } from 'react';
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
import { Icon } from '@chakra-ui/icons';
import { MdAdd, MdImage } from 'react-icons/md';
import PublicityButton from './PublicityButton';
import SearchImage from '../popovers/SearchImage';
import { addBoard } from '../../api/board';

type Props = Partial<UseDisclosureReturn> & {
  onAdded?: () => void;
};

const AddBoardModal: VFC<Props> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [publicity, setPublicity] = useState(false);
  const [image, setImage] = useState('');

  const handleChangePublicity = () => setPublicity((prev) => !prev);

  const handleSelectImage = (url: string) => {
    setImage(url);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddBoard = async () => {
    try {
      const res = await addBoard(name, image, publicity);

      onClose();
      onAdded();
    } catch (e) {}
  };

  const handleClose = () => {
    setName('');
    setImage('');
    setPublicity(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
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
            <Input
              mb="6"
              shadow="sm"
              value={name}
              onChange={handleChangeName}
            />
            <Flex justify="space-between">
              <SearchImage onSelectImage={handleSelectImage}>
                <Button
                  colorScheme="gray"
                  leftIcon={<Icon as={MdImage} />}
                  flexGrow={1}
                  size="sm"
                >
                  Cover
                </Button>
              </SearchImage>
              <Spacer />
              <PublicityButton
                flexGrow={1}
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
          <Button
            leftIcon={<Icon as={MdAdd} />}
            colorScheme="teal"
            size="sm"
            onClick={handleAddBoard}
          >
            追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBoardModal;
