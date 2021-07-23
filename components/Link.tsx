import { VFC } from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

const Link: VFC<LinkProps> = ({ href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props} />
    </NextLink>
  );
};

export default Link;
