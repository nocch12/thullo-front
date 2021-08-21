import { Board } from '../../types/board';
import { Task } from '../../types/task';
import { Icon } from '@chakra-ui/icons';
import {
  AvatarGroup,
  Avatar,
  Box,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Wrap,
  WrapItem,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { VFC } from 'react';
import { MdAttachFile, MdComment } from 'react-icons/md';
import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

type Props = {
  boardId: Board['id'];
  task: Task;
  taskDraggableProvided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
};

const TaskCard: VFC<Props> = ({
  boardId,
  task,
  taskDraggableProvided,
  snapshot,
}) => {
  const style = taskDraggableProvided.draggableProps.style;
  const transform = snapshot.isDragging
    ? `${style.transform} rotate(4deg)`
    : style.transform;

  const getStyle = () => {
    if (snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transform,
    };
  };

  return (
    <Box
      w="full"
      shadow={snapshot.isDragging ? 'lg' : 'sm'}
      bg="white"
      rounded="md"
      ref={taskDraggableProvided.innerRef}
      {...taskDraggableProvided.draggableProps}
      {...taskDraggableProvided.dragHandleProps}
      style={getStyle()}
    >
      <LinkBox p="2">
        {/* 画像 */}
        {task.imgePath ? (
          <Image
            h="100px"
            w="full"
            src={task.imgePath}
            fallbackSrc="https://via.placeholder.com/150"
            rounded="md"
            mb="2"
          />
        ) : null}
        {/* タイトル */}
        <Link href={`/boards/${boardId}/${task.id}`} passHref>
          <LinkOverlay>
            <Text fontWeight="bold">{task.taskName}</Text>
          </LinkOverlay>
        </Link>
        {/* タグ */}
        {task.labels?.length && (
          <Wrap spacing="1" mt="2">
            {task.labels.map((l) => (
              <WrapItem>
                <Badge fontWeight="normal">test</Badge>
              </WrapItem>
            ))}
          </Wrap>
        )}
        {task.users?.length && (
          <Flex mt="2" alignItems="center" justify="space-between">
            {/* メンバー */}
            <Box>
              <AvatarGroup size="sm" max={3}>
                {task.users.map((u) => (
                  <Avatar name={u.name} src={u.imagePath} />
                ))}
              </AvatarGroup>
            </Box>
            {/* コメント、ファイル */}
            {task.commentCount || task.fileCount ? (
              <Flex
                justify="flex-end"
                alignItems="center"
                fontSize="xs"
                color="gray"
              >
                <Icon as={MdComment} />
                <Text ml="1">{task.commentCount || 0}</Text>
                <Icon ml="2" as={MdAttachFile} />
                <Text ml="1">{task.fileCount || 0}</Text>
              </Flex>
            ) : null}
          </Flex>
        )}
      </LinkBox>
    </Box>
  );
};

export default TaskCard;
