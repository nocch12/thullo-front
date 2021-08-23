import TaskList from './TaskList';
import { Box, Flex, HStack } from '@chakra-ui/react';
import { VFC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Board } from '../../types/board';
import usetaskLists from '../../hooks/useTaskLists';
import TaskListAdd from './TaskListAdd';

type Props = {
  boardId: Board['id'];
};

const TaskListArea: VFC<Props> = ({ boardId }) => {
  const {
    lists,
    listIds,
    tasks,
    addList,
    deleteList,
    handleDragEnd,
    addTaskToLists,
  } = usetaskLists(boardId);

  return (
    <Box
      flexGrow={1}
      bgColor="teal.50"
      py={4}
      h="full"
      rounded="md"
      overflowX="auto"
      overflowY="hidden"
    >
      <HStack alignItems="flex-start" spacing={6} h="full">
        <DragDropContext
          // onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Droppable
            droppableId="droppable-LISTAREA"
            direction="horizontal"
            type="LIST"
          >
            {(provided) => (
              <Flex
                alignItems="flex-start"
                spacing={6}
                h="full"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {listIds.map((id, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(draggableProvided) => (
                      <Box
                        key={id}
                        minW="280px"
                        h="full"
                        mx={2}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TaskList
                          list={lists[id]}
                          tasks={tasks}
                          onAddTask={(taskName) => addTaskToLists(id, taskName)}
                          onDelete={() => deleteList(id, index)}
                          listDragHandleProps={
                            draggableProvided.dragHandleProps
                          }
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Box minW="280px" mx={2}>
                  <TaskListAdd onSubmit={addList} />
                </Box>
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </HStack>
    </Box>
  );
};

export default TaskListArea;
