import {
  VFC,
  PropsWithChildren,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  SimpleGrid,
  Flex,
  Spacer,
  Box,
  Button,
  Wrap,
  WrapItem,
  Badge,
  Icon
} from '@chakra-ui/react';
import { MdLabel, MdClose } from 'react-icons/md';

import { labelColors } from '../../../../config/colors';
import SectionHeader from '../../../SectionHeader';
import TaskLabelBadge from './TaskLabelBadge';

type Props = {
  onSelect: (url: string) => void;
};

const TaskLabel: VFC<PropsWithChildren<Props>> = ({ onSelect, children }) => {
  const [labelInput, setLabelInput] = useState('');

  const handleClose = () => {
    console.log('TaskLabels Closed.');
  };

  const onSearch = async (value: string) => {};

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLabelInput(e.target.value);
  };

  return (
    <Popover onOpen={() => setLabelInput('')} onClose={handleClose}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>ラベル</PopoverHeader>
        <PopoverBody>
          <Text mb="2">入力して色を選択</Text>
          <Input
            mb="2"
            size="sm"
            shadow="md"
            maxLength={10}
            value={labelInput}
            onChange={handleChangeInput}
          />
          <Spacer mb="2" />
          <SimpleGrid columns={4} spacing="2">
            {labelColors.map((c) => (
              <Button colorScheme={c} w="full" h="6" rounded="md" isTruncated />
            ))}
          </SimpleGrid>
          <Spacer mb="2" />
          <Box>
            <SectionHeader icon={MdLabel}>設定済み</SectionHeader>
            <Spacer mb="2" />
            <Wrap spacing="2">
              <WrapItem>
                <TaskLabelBadge colorScheme="red" isDeletable>
                  test
                </TaskLabelBadge>
              </WrapItem>
            </Wrap>

          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TaskLabel;
