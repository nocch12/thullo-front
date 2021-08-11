import { Icon } from '@chakra-ui/icons';
import { Button, useDisclosure, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAdd, MdDescription } from 'react-icons/md';

import Alert from '../../Alert';
import SectionHeader from '../../SectionHeader';

import Attachment from './Attachment';
import FileUpload from './FileUpload';

const attachments = [{ id: '1' }, { id: '2' }, { id: '3' }];

const TaskModalAttachment = () => {
  const [deleteId, setDeleteId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAdd = () => {
    onOpen();
  };

  const handleDelete = (fileId: string) => {
    setDeleteId(fileId);
  };

  const handleDeleteCommit = () => {
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
          onClick={handleAdd}>
          追加
        </Button>
      </Flex>
      <VStack alignItems="flex-start" spacing={4}>
        {attachments.map((file) => (
          <Attachment
            key={file.id}
            fileInfo={file}
            onDownload={() => handleDownload('test')}
            onDelete={() => handleDelete('test')}
          />
        ))}
      </VStack>

      {/* 追加モーダル */}
      <FileUpload isOpen={isOpen} onClose={onClose} />

      {/* 削除モーダル */}
      <Alert
        isOpen={!!deleteId}
        onClose={() => setDeleteId('')}
        headerText="削除"
        bodyText="削除しますか？">
        <Button ml="3" colorScheme="red" onClick={() => handleDeleteCommit()}>
          削除する
        </Button>
      </Alert>
    </>
  );
};

export default TaskModalAttachment;
