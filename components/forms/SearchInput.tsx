import { FormEvent, VFC, ChangeEvent } from 'react';
import {
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { MdSearch } from 'react-icons/md';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
};

const SearchInput: VFC<Props> = ({ value, onChange, onSearch }) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputGroup as="form" size="sm" onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="search image..."
        value={value}
        size="sm"
        onChange={onInput}
      />
      <InputRightElement>
        <IconButton
          aria-label="search"
          icon={<Icon as={MdSearch} />}
          type="submit"
          size="xs"
          colorScheme="teal"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
