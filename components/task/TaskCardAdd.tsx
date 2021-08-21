import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Input,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react';
import { VFC, useState, useRef, FormEvent, ChangeEvent } from 'react';
import { MdClose } from 'react-icons/md';
import { Task } from '../../types/task';
import AddTaskButton from '../button/AddTaskButton';

type Props = {
  onAddTask: (taskName: Task['taskName']) => void;
};

const TaskCardAdd: VFC<Props> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [adding, setAdding] = useBoolean();

  const handleAddStart = () => {
    setAdding.on();
  };

  const handleAddEnd = () => {
    setAdding.off();
    setTaskName('');
  };

  const handleAddComit = async (e: FormEvent) => {
    e.preventDefault();
    onAddTask(taskName);
    handleAddEnd();
  };

  const ref = useRef();
  useOutsideClick({
    ref,
    handler: handleAddEnd,
  });

  return adding ? (
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
      タスクを追加
    </AddTaskButton>
  );
};

export default TaskCardAdd;
