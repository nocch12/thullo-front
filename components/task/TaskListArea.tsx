import useBoardDetail from '../../hooks/useBoardDetail';
import usetaskList from '../../hooks/useTaskList';
import { TTaskList } from '../../types/taskList';
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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdClose } from 'react-icons/md';
import useDND from '../../hooks/useDND';

const TaskListArea = () => {
  const { boardDetail } = useBoardDetail();
  const [adding, setAdding] = useBoolean();
  const [listName, setListName] = useState('');
  const ref = useRef();
  const { listIds, lists, addList, deleteList } = usetaskList(boardDetail?.id);
  const { handleDragStart, handleDragEnd } = useDND();

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

  const handleDeleteList = async (listId: TTaskList['id']) => {
    await deleteList(listId);
    handleAddEnd();
  };

  useOutsideClick({
    ref,
    handler: handleAddEnd,
  });

  return (
    <Box
      overflowX="auto"
      flexGrow={1}
      bgColor="teal.50"
      p="4"
      h="full"
      rounded="md"
      overflowY="hidden"
    >
      <HStack alignItems="flex-start" spacing={6}>
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Droppable
            droppableId="droppable-LISTAREA"
            direction="horizontal"
            type="LIST"
          >
            {(provided) => (
              <HStack
                alignItems="flex-start"
                spacing={6}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {listIds.map((id, index) => (
                  <Draggable
                    key={id}
                    draggableId={`draggable-LIST-${id}`}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <Box
                        key={id}
                        minW="280px"
                        h="full"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TaskList
                          list={lists[id]}
                          onDelete={() => handleDeleteList(id)}
                          listDragHandleProps={
                            draggableProvided.dragHandleProps
                          }
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </HStack>
            )}
          </Droppable>
        </DragDropContext>
        <Box minW="280px">
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
    </Box>
  );
};

export default TaskListArea;
