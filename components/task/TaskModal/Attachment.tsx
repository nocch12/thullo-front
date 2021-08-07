import { VFC } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Center,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';

type TAttachment = {
  fileInfo: {};
  onDownload: () => void;
  onDelete: () => void;
};

const Attachment: VFC<TAttachment> = ({ fileInfo, onDownload, onDelete }) => {
  const isImage = false;

  const shortFileName = 'AG';

  return (
    <Flex alignItems="center">
      <Center
        w="28"
        h="20"
        mr="2"
        bgColor="gray.300"
        overflow="hidden"
        rounded="md"
      >
        {isImage ? (
          <Image
            w="full"
            h="full"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/150"
          />
        ) : (
          <Text>{shortFileName}</Text>
        )}
      </Center>
      <Box>
        <Text as="small" color="gray">
          {'created at'}
        </Text>
        <Text mb="1">aaaaaaaaaa</Text>
        <ButtonGroup>
          <Button size="xs" color="gray" variant="outline" onClick={onDownload}>
            Download
          </Button>
          <Button size="xs" color="gray" variant="outline" onClick={onDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Attachment;
