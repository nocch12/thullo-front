import { TaskList } from '../../types/taskList';
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
import { VFC } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

type Props = {
  list: TaskList;
};

const TaskListComponent: VFC<Props> = ({ list }) => {
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
          defaultValue={list.listName}
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
        {list.Task.map((t) => (
          <TaskCard key={t.id} boardId={list.boardId} task={t} />
        ))}
      </VStack>
    </Box>
  );
};

export default TaskListComponent;
