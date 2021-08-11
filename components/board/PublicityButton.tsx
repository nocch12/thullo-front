import { Icon } from '@chakra-ui/icons';
import { Button, ButtonProps } from '@chakra-ui/react';
import { MouseEvent, VFC } from 'react';
import { MdLockOutline, MdLockOpen } from 'react-icons/md';

type OnClick = (e: MouseEvent) => void;

type Props = ButtonProps & {
  isPublic: unknown;
};

const PublicityButton: VFC<Props> = ({ isPublic, colorScheme, leftIcon, size, ...props}) => {
  return (
    <Button
      colorScheme={isPublic ? 'teal' : 'gray'}
      leftIcon={isPublic ? <Icon as={MdLockOutline} /> : <Icon as={MdLockOpen} />}
      size="sm"
      minW="fit-content"
      {...props}
    >
      {isPublic ? '公開' : '非公開'}
    </Button>
  )
};

export default PublicityButton;
