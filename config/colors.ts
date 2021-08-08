import { ButtonProps } from '@chakra-ui/react';

type ColorList = ButtonProps['colorScheme'];

export const labelColors = [
  'green',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
  'blue',
  'cyan',
  'blackAlpha',
  'gray',
] as const;

export type LabelColorList = typeof labelColors[number];