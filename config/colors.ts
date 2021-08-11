import { ButtonProps } from '@chakra-ui/react';

type ColorList = ButtonProps['colorScheme'];

export const labelColors: {[key: string]: ColorList} = {
  '000': 'green',
  '001': 'yellow',
  '002': 'orange',
  '003': 'red',
  '004': 'pink',
  '005': 'purple',
  '006': 'blue',
  '007': 'cyan',
  '008': 'blackAlpha',
  '009': 'gray',
} as const;

const c = Object.values(labelColors);
export type LabelColorList = typeof c[number];
