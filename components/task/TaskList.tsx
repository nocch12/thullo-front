import useTask from '../../hooks/useTask';
import { TTaskListFormatted } from '../../types/taskList';
import AddTaskButton from '../button/AddTaskButton';
import TaskCard from './TaskCard';
import { Icon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  useBoolean,
  Input,
  useOutsideClick,
  ButtonGroup,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { VFC, useRef, FormEvent, ChangeEvent, useState } from 'react';
import { MdClose, MdMoreHoriz } from 'react-icons/md';
import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import { Task, TTasks } from '../../types/task';

type Props = {
  tasks: TTasks;
  list: TTaskListFormatted;
  onAddTask: (taskName: Task['taskName']) => void;
  onDelete: () => void;
  listDragHandleProps?: DraggableProvidedDragHandleProps;
};

const TaskListComponent: VFC<Props> = ({
  tasks,
  list,
  onDelete,
  onAddTask,
  listDragHandleProps,
}) => {
  const [taskName, setTaskName] = useState('');
  const [adding, setAdding] = useBoolean();

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
    onAddTask(taskName);
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
      <Flex
        alignItems="center"
        justify="space-between"
        mb="2"
        pt={2}
        pr={2}
        pl={3}
      >
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="delete list"
            variant="ghost"
            icon={<MdMoreHoriz />}
            size="sm"
            cursor="pointer"
            {...listDragHandleProps}
            style={{ cursor: 'pointer' }}
          />
          <MenuList>
            <MenuItem onClick={onDelete}>リストを削除</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Droppable droppableId={list.id.toString()} type="TASK">
        {(dropableProvided) => (
          <VStack
            spacing="2"
            p={2}
            overflowY="auto"
            flex={1}
            ref={dropableProvided.innerRef}
            {...dropableProvided.droppableProps}
          >
            {list.Task.map((tid, index) => (
              <Draggable key={tid} draggableId={tid.toString()} index={index}>
                {(draggableProvided, snapshot) => (
                  <TaskCard
                    boardId={list.boardId}
                    task={tasks[tid]}
                    taskDraggableProvided={draggableProvided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {dropableProvided.placeholder}
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
        )}
      </Droppable>
    </Flex>
  );
};

export default TaskListComponent;
