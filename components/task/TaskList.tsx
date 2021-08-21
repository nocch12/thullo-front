import { TTaskListFormatted } from '../../types/taskList';
import TaskCard from './TaskCard';
import {
  Box,
  Flex,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { VFC } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import { Task, TTasks } from '../../types/task';
import TaskCardAdd from './TaskCardAdd';

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
  const handleCancel = () => {
    console.log('cancel');
  };
  const handleChange = () => {
    console.log('change');
  };

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
            <TaskCardAdd onAddTask={onAddTask} />
          </VStack>
        )}
      </Droppable>
    </Flex>
  );
};

export default TaskListComponent;
