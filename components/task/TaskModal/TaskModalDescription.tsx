import { Icon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Button,
  Box,
  Flex,
  Text,
  Textarea,
  useBoolean,
} from '@chakra-ui/react';
import React from 'react';
import { MdEdit, MdDescription } from 'react-icons/md';

import SectionHeader from '../../SectionHeader';

const TaskModalDescription = () => {
  const [isEditing, setEditing] = useBoolean();

  const handleEdit = () => {
    setEditing.off();
  };
  return (
    <>
      <Flex alignItems="center" mb="4">
        <SectionHeader icon={MdDescription}>詳細</SectionHeader>
        {isEditing ? null : (
          <Button
            ml="2"
            leftIcon={<Icon as={MdEdit} />}
            size="xs"
            color="gray"
            variant="outline"
            onClick={setEditing.on}
          >
            編集
          </Button>
        )}
      </Flex>
      {isEditing ? (
        <>
          <Textarea />
          <ButtonGroup mt="2">
            <Button size="xs" onClick={setEditing.off}>
              キャンセル
            </Button>
            <Button size="xs" colorScheme="teal" onClick={handleEdit}>
              保存
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Box as="pre">{`gsrg\ngsrgreggsrgagra  grs\n\ngrsgrgs`}</Box>
      )}
    </>
  );
};

export default TaskModalDescription;
