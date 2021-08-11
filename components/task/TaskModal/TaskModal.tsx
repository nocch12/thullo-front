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
  Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { VFC } from 'react';
import { MdAccountCircle, MdImage, MdLabel, MdPeople } from 'react-icons/md';

import Account from '../../Account';
import SectionHeader from '../../SectionHeader';
import SearchImage from '../../popovers/SearchImage';

import TaskLabels from './TaskLabel/TaskLabel';
import TaskModalAttachment from './TaskModalAttachment';
import TaskModalDescription from './TaskModalDescription';


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
                <SectionHeader icon={MdAccountCircle}>その他</SectionHeader>

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
                  <TaskLabels onSelect={() => {}}>
                    <Button
                      colorScheme="gray"
                      leftIcon={<Icon as={MdLabel} />}
                      size="sm"
                      justifyContent="flex-start"
                    >
                      ラベル
                    </Button>
                  </TaskLabels>
                </VStack>
              </Box>
              <Box>
                <SectionHeader icon={MdPeople}>
                  担当
                </SectionHeader>
                <Spacer mb="2" />
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
