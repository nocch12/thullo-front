import useBoardDetail from '../../hooks/useBoardDetail';
import usetaskList from '../../hooks/useTaskList';
import AddTaskButton from '../button/AddTaskButton';
import TaskList from './TaskList';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Input,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';

const TaskListArea = () => {
  const { boardDetail } = useBoardDetail();
  const [adding, setAdding] = useBoolean();
  const [listName, setListName] = useState('');
  const ref = useRef();
  const { lists, addList } = usetaskList(boardDetail?.id);

  const handleAddStart = () => {
    setAdding.on();
  };

  const handleAddEnd = () => {
    setAdding.off();
    setListName('');
  };

  const handleAddComit = async (e: FormEvent) => {
    e.preventDefault();
    await addList(listName);
    handleAddEnd();
  };

  useOutsideClick({
    ref,
    handler: handleAddEnd,
  });

  return (
    <HStack
      overflowX="auto"
      spacing={4}
      flexGrow={1}
      alignItems="flex-start"
      bgColor="teal.50"
      p="4"
      rounded="md"
    >
      {lists.map((l) => (
        <Box key={l.id} w="260px">
          <TaskList list={l} />
        </Box>
      ))}
      <Box w="260px">
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
        )}
      </Box>
    </HStack>
  );
};

export default TaskListArea;
