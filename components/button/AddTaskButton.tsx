import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { VFC, PropsWithChildren } from 'react';
import { MdAdd } from 'react-icons/md';

type Props = PropsWithChildren<
  Omit<ButtonProps, 'colorSheme' | 'variant' | 'w' | 'leftIcon'>
>;

const AddTaskButton: VFC<Props> = ({ children, ...props }) => {
  return (
    <Button
      w="full"
      colorScheme="cyan"
      variant="outline"
      leftIcon={<Icon as={MdAdd} />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddTaskButton;
