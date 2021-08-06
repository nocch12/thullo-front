import { MouseEvent, VFC } from 'react';
import { Button } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';

type OnClick = (e: MouseEvent) => void;

type Props = {
  isPublic: unknown;
  onClick: OnClick;
};

const PublicButton: VFC<{ onClick: OnClick }> = ({ onClick }) => {
  return (
    <Button
      colorScheme="teal"
      leftIcon={<UnlockIcon />}
      flexGrow={1}
      size="sm"
      onClick={onClick}
    >
      Public
    </Button>
  );
};

const PrivateButton: VFC<{ onClick: OnClick }> = ({ onClick }) => {
  return (
    <Button
      colorScheme="gray"
      leftIcon={<LockIcon />}
      flexGrow={1}
      size="sm"
      onClick={onClick}
    >
      Private
    </Button>
  );
};

const PublicityButton: VFC<Props> = ({ isPublic, onClick }) => {
  return isPublic ? <PublicButton onClick={onClick} /> : <PrivateButton onClick={onClick} />;
};

export default PublicityButton;
