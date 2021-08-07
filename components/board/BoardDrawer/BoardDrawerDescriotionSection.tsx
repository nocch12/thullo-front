import {
  Flex,
  Box,
  Button,
  ButtonGroup,
  Text,
  Textarea,
  useBoolean,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdDescription, MdEdit } from 'react-icons/md';

const BoardDrawerDescriotionSection = () => {
  const [isEditing, setEditing] = useBoolean();

  const handleEdit = () => {
    setEditing.off();
  }

  return (
    <>
      <Flex alignItems="center" mb="4">
        <Icon as={MdDescription} color="gray" />
        <Text ml="2" color="gray" fontSize="xs">
          詳細
        </Text>
        {isEditing ? null : (
          <Button
            ml="2"
            leftIcon={<Icon as={MdEdit} />}
            size="xs"
            color="gray"
            variant="outline"
            onClick={setEditing.on}
          >
            編集
          </Button>
        )}
      </Flex>
      {isEditing ? (
        <>
        <Textarea />
        <ButtonGroup mt="2">
          <Button size="xs" onClick={setEditing.off}>キャンセル</Button>
          <Button size="xs" colorScheme="teal" onClick={handleEdit}>保存</Button>
        </ButtonGroup>
        </>
      ) : (
        <Box as="pre">{`gsrg\ngsrgreggsrgagra  grs\n\ngrsgrgs`}</Box>
      )}
    </>
  );
};

export default BoardDrawerDescriotionSection;
