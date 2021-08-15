import useUser from '../../hooks/useUser';
import SearchInput from '../forms/SearchInput';
import { Box, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, VFC } from 'react';
import { MdSearch } from 'react-icons/md';

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
    <>
      <Box display={['flex', null, 'none']}>
        <Link href="/boards/search" passHref>
          <IconButton
            as="a"
            aria-label="search board"
            icon={<MdSearch />}
            size="sm"
          />
        </Link>
      </Box>
      <Box display={['none', null, 'block']}>
        <SearchInput
          onSearch={handleSearch}
          onChange={setText}
          placeHolder="ボードを検索"
          value={text}
        />
      </Box>
    </>
  ) as JSX.Element;
};

export default SearchBoard;
