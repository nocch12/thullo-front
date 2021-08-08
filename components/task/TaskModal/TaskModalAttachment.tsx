import { VFC, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  Text,
  VStack,
  Image,
  useBoolean,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdAdd, MdDescription } from 'react-icons/md';
import Attachment from './Attachment';
import Alert from '../../Alert';
import SectionHeader from '../../SectionHeader';

const attachments = [{}, {}, {}];

const TaskModalAttachment = () => {
  const [deleteId, setDeleteId] = useState('');

  const handleAdd = () => {};

  const handleDelete = (fileId: string) => {
    setDeleteId(fileId);
  };

  const handleDeleteCommit = () => {
    console.log(deleteId);
    setDeleteId('');
  };

  const handleDownload = (fileId: string) => {
    console.log('handleDownload');
    console.log(fileId);
  };

  return (
    <>
      <Flex alignItems="center" mb="4">
        <SectionHeader icon={MdDescription}>添付ファイル</SectionHeader>
        <Button
          ml="2"
          leftIcon={<Icon as={MdAdd} />}
          size="xs"
          color="gray"
          variant="outline"
          onClick={handleAdd}
        >
          追加
        </Button>
      </Flex>
      <VStack alignItems="flex-start" spacing={4}>
        {attachments.map((file) => (
          <Attachment
            fileInfo={file}
            onDownload={() => handleDownload('test')}
            onDelete={() => handleDelete('test')}
          />
        ))}
      </VStack>
      <Alert
        isOpen={!!deleteId}
        onClose={() => setDeleteId('')}
        headerText="削除"
        bodyText="削除しますか？"
      >
        <Button ml="3" colorScheme="red" onClick={() => handleDeleteCommit()}>
          削除する
        </Button>
      </Alert>
    </>
  );
};

export default TaskModalAttachment;
