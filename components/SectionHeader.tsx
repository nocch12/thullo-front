import { Flex, Icon, Text } from '@chakra-ui/react';
import { VFC, PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

type Props = PropsWithChildren<{
  icon: IconType;
}>;

const SectionHeader: VFC<Props> = ({ icon, children }) => {
  return (
    <Flex color="gray" alignItems="center" fontSize="sm">
      <Icon as={icon} />
      <Text ml="2">{children}</Text>
    </Flex>
  );
};

export default SectionHeader;
