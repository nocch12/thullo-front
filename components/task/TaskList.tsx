import useTask from '../../hooks/useTask';
import { TaskList } from '../../types/taskList';
import AddTaskButton from '../button/AddTaskButton';
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
  useBoolean,
  Input,
  useOutsideClick,
  ButtonGroup,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { VFC, useRef, FormEvent, ChangeEvent, useState } from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';

type Props = {
  list: TaskList;
};

const TaskListComponent: VFC<Props> = ({ list }) => {
  const [taskName, setTaskName] = useState('');
  const [adding, setAdding] = useBoolean();
  const { taskList, addTask } = useTask(list);

  const ref = useRef();

  const handleCancel = () => {
    console.log('cancel');
  };
  const handleChange = () => {
    console.log('change');
  };

  const handleAddStart = () => {
    setAdding.on();
  };

  const handleAddEnd = () => {
    setAdding.off();
    setTaskName('');
  };

  const handleAddComit = async (e: FormEvent) => {
    e.preventDefault();
    await addTask(taskName);
    handleAddEnd();
  };

  useOutsideClick({
    ref,
    handler: handleAddEnd,
  });

  return (
    <Flex
      w="full"
      h="full"
      flexDirection="column"
      rounded="md"
      bgColor="gray.50"
    >
      <Flex alignItems="center" justify="space-between" mb="2" p={2}>
        <Editable
          defaultValue={taskList.listName}
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
      <VStack spacing="2" p={2} overflowY="auto" flex={1}>
        {taskList.Task.map((t) => (
          <TaskCard key={t.id} boardId={taskList.boardId} task={t} />
        ))}
        {adding ? (
          <Box
            as="form"
            p={2}
            rounded="md"
            shadow="sm"
            bgColor="white"
            ref={ref}
            onSubmit={handleAddComit}
          >
            <Input
              size="sm"
              rounded="md"
              value={taskName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskName(e.target.value)
              }
            />
            <ButtonGroup mt={2} alignItems="center">
              <Button type="submit" size="sm" colorScheme="teal">
                追加
              </Button>
              <IconButton
                aria-label="cancel"
                size="sm"
                icon={<Icon as={MdClose} />}
                variant="ghost"
                onClick={handleAddEnd}
              />
            </ButtonGroup>
          </Box>
        ) : (
          <AddTaskButton size="sm" onClick={handleAddStart}>
            リストを追加
          </AddTaskButton>
        )}
      </VStack>
    </Flex>
  );
};

export default TaskListComponent;
