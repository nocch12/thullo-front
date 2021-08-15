import { Icon } from '@chakra-ui/icons';
import {
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { FormEvent, VFC, ChangeEvent } from 'react';
import { MdSearch } from 'react-icons/md';

type Props = {
  value: string;
  placeHolder?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
};

const SearchInput: VFC<Props> = ({
  value,
  placeHolder,
  onChange,
  onSearch,
}) => {
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
        placeholder={placeHolder ? placeHolder : '検索...'}
        value={value}
        size="sm"
        rounded="md"
        shadow="md"
        enterKeyHint="search"
        onChange={onInput}
      />
      <InputRightElement>
        <Icon as={MdSearch} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
