import { FormEvent, VFC, useState, ChangeEvent, useEffect, memo } from 'react';
import {
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

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
          icon={<SearchIcon />}
          type="submit"
          size="xs"
          colorScheme="teal"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
