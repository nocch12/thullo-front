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
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';

import TaskModalDescription from './TaskModalDescription';
import TaskModalAttachment from './TaskModalAttachment';

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
            <Box w="300px">actions</Box>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
