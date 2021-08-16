import TaskCard from './TaskCard';
import { Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';

const TaskList = () => {
  const handleCancel = () => {
    console.log('cancel');
  };
  const handleChange = () => {
    console.log('change');
  };

  return (
    <Box w="full">
      <Flex alignItems="center" justify="space-between" mb="2">
        <Editable
          defaultValue="heading"
          onCancel={handleCancel}
          onChange={handleChange}
          onSubmit={handleChange}
          onBlur={handleCancel}
          submitOnBlur={false}
        >
          <EditablePreview as="h3" fontSize="md" fontWeight="bold" />
          <EditableInput />
        </Editable>
        <Icon as={MdMoreHoriz} />
      </Flex>
      <VStack spacing="2">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </VStack>
    </Box>
  );
};

export default TaskList;
