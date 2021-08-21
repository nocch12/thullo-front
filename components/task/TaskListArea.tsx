import TaskList from './TaskList';
import { Box, HStack } from '@chakra-ui/react';
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
          // onDragStart={handleDragStart}
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
                  <Draggable key={id} draggableId={id.toString()} index={index}>
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
                          tasks={tasks}
                          onAddTask={(taskName) => addTaskToLists(id, taskName)}
                          onDelete={() => deleteList(id)}
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
          <TaskListAdd onSubmit={addList} />
        </Box>
      </HStack>
    </Box>
  );
};

export default TaskListArea;
