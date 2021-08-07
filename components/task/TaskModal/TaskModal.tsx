import { useRouter } from 'next/router';
import { VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { MdAccountCircle, MdImage, MdLabel, MdPeople } from 'react-icons/md';

import Account from '../../Account';
import TaskModalDescription from './TaskModalDescription';
import TaskModalAttachment from './TaskModalAttachment';
import SearchImage from '../../popovers/SearchImage';

type Props = {
  taskId: string;
};

const TaskModal: VFC<Props> = ({ taskId }) => {
  if (!taskId) return null;
  const router = useRouter();

  const onClose = () => {
    router.push({
      pathname: router.pathname,
      query: { boardId: router.query.boardId },
    });
  };

  const handleSelectImage = () => {};

  return (
    <Modal size="4xl" isOpen={!!taskId} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Image
            h="150px"
            w="full"
            objectFit="cover"
            src={null}
            fallbackSrc={null || 'https://via.placeholder.com/150'}
            rounded="md"
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            {/* モーダル左 */}
            <Box flexGrow={1}>
              <Box mb="6">
                <Heading as="h3">heading</Heading>
                <Text>
                  <Text as="small" color="gray" mr="1">
                    in list
                  </Text>
                  in progress
                </Text>
              </Box>

              {/* 詳細 */}
              <Box mb="6">
                <TaskModalDescription />
              </Box>

              {/* ファイル */}
              <Box mb="6">
                <TaskModalAttachment />
              </Box>

              {/* コメント */}
            </Box>
            {/* モーダル右 */}
            <Box w="200px">
              <Box mb="6">
                <Flex color="gray" alignItems="center" mb="4">
                  <Icon as={MdAccountCircle} />
                  <Text ml="2">その他</Text>
                </Flex>
                <VStack alignItems="stretch" spacing="4">
                  <SearchImage onSelectImage={handleSelectImage}>
                    <Button
                      colorScheme="gray"
                      leftIcon={<Icon as={MdImage} />}
                      size="sm"
                      justifyContent="flex-start"
                    >
                      カバー画像
                    </Button>
                  </SearchImage>
                  <Button
                    colorScheme="gray"
                    leftIcon={<Icon as={MdLabel} />}
                    size="sm"
                    justifyContent="flex-start"
                  >
                    ラベル
                  </Button>
                </VStack>
              </Box>
              <Box>
                <Flex color="gray" alignItems="center" mb="4">
                  <Icon as={MdPeople} />
                  <Text ml="2">担当</Text>
                </Flex>
                <VStack spacing="2" alignItems="flex-start">
                  <Account>
                    <Text>test</Text>
                  </Account>
                  <Account>
                    <Text>test</Text>
                  </Account>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
