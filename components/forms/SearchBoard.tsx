import useUser from '../../hooks/useUser';
import SearchInput from './SearchInput';
import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect, VFC } from 'react';

const SearchBoard: VFC = () => {
  const { user, ifLoggedIn } = useUser();
  const [text, setText] = useState('');
  const router = useRouter();

  useEffect(() => {
    setText('');
  }, [user]);

  const handleSearch = (value: string) => {
    router.push(`/boards?search=${value}`);
  };

  return ifLoggedIn(
    <SearchInput
      onSearch={handleSearch}
      onChange={setText}
      placeHolder="ボードを検索"
      value={text}
    />
  ) as JSX.Element;
};

export default SearchBoard;
