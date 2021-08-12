import useBoardDetail from '../../../hooks/useBoardDetail';
import { Icon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Button,
  ButtonGroup,
  Text,
  Textarea,
  useBoolean,
} from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect, KeyboardEvent } from 'react';
import { MdDescription, MdEdit } from 'react-icons/md';

const BoardDrawerDescriotionSection = () => {
  const [isEditing, setEditing] = useBoolean();
  const [localDesc, setLocalDesc] = useState('');
  const { boardDetail } = useBoardDetail();

  useEffect(() => {
    setLocalDesc(boardDetail.description);
  }, [boardDetail.description]);

  const handleCancel = () => {
    setLocalDesc(boardDetail.description);
    setEditing.off();
  };

  const handleKeySubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      setEditing.off();
    }
  };

  const handleClickSubmit = () => {
    setEditing.off();
  };

  const handleChangeDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalDesc(e.target.value);
  };

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
          <Textarea
            value={localDesc}
            onChange={handleChangeDesc}
            onKeyDown={handleKeySubmit}
          />
          <ButtonGroup mt="2">
            <Button size="xs" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button size="xs" colorScheme="teal" onClick={handleClickSubmit}>
              保存
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Box as="pre">{boardDetail?.description}</Box>
      )}
    </>
  );
};

export default BoardDrawerDescriotionSection;
