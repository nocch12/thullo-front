import { Badge, Icon } from '@chakra-ui/react';
import { VFC, PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';

import { LabelColorList } from '../../../../config/colors';

type Props = {
  colorScheme: LabelColorList;
  isDeletable?: unknown;
  onClick?: () => void;
};

const TaskLabelBadge: VFC<PropsWithChildren<Props>> = ({
  colorScheme,
  isDeletable = false,
  onClick,
  children,
}) => {
  const asProp = isDeletable ? 'button' : 'span';
  return (
    <Badge
      as={asProp}
      colorScheme={colorScheme}
      display="inline-flex"
      alignItems="center"
      onClick={onClick ? onClick : () => {}}
    >
      {isDeletable && <Icon as={MdClose} />}
      {children}
    </Badge>
  );
};

export default TaskLabelBadge;
