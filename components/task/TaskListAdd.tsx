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
import { ChangeEvent, useRef, useState, VFC } from 'react';
import { MdClose } from 'react-icons/md';
import { TTaskList } from '../../types/taskList';
import AddTaskButton from '../button/AddTaskButton';

type Props = {
  onSubmit: (listName: TTaskList['listName']) => void;
};

const TaskListAdd: VFC<Props> = ({ onSubmit }) => {
  const [adding, setAdding] = useBoolean();
  const [listName, setListName] = useState('');

  const ref = useRef();

  const handleAddStart = () => {
    setAdding.on();
  };

  const handleAddEnd = () => {
    setAdding.off();
    setListName('');
  };

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
      onSubmit={() => onSubmit(listName)}
    >
      <Input
        size="sm"
        rounded="md"
        value={listName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setListName(e.target.value)
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
  );
};

export default TaskListAdd;
