import { searchUser as searchUserApi } from '../../api/user';
import { TSimpleUser } from '../../types/user';
import Account from '../Account';
import SearchInput from '../forms/SearchInput';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  Image,
  SimpleGrid,
  useBoolean,
  Spacer,
  Box,
  MenuList,
  Checkbox,
  List,
  ListItem,
  Flex,
  Center,
  Button,
  CheckboxGroup,
  CheckboxGroupProps,
} from '@chakra-ui/react';
import { StringOrNumber } from '@chakra-ui/utils';
import { VFC, PropsWithChildren, useState, useEffect } from 'react';

type Props = {
  excludeUserIds: TSimpleUser['id'][];
  onInvite: (checked: StringOrNumber[]) => Promise<any>;
  inviting: boolean;
};

const SearchUserPopover: VFC<PropsWithChildren<Props>> = ({
  excludeUserIds,
  onInvite,
  inviting,
  children,
}) => {
  const [users, setUsers] = useState<TSimpleUser[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [checked, setChecked] = useState<StringOrNumber[]>([]);
  const [searching, setSearching] = useBoolean();

  const handleClose = () => {
    console.log('SearchUsers Closed.');
  };

  const handleSearch = async (value: string) => {
    setSearching.on();
    handleCheck([]);
    const res = await searchUserApi(value, excludeUserIds);
    setUsers(res.data);
    setSearching.off();
  };

  const handleCheck: CheckboxGroupProps['onChange'] = (val) => {
    setChecked(val);
  };

  const handleInvite = async () => {
    await onInvite(checked);
    handleSearch(searchInput);
  };

  return (
    <Popover onClose={handleClose}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>ユーザー</PopoverHeader>
        <PopoverBody>
          <Text mb="2">ユーザーを招待する</Text>
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
          />
          <Spacer mb="2" />
          <Box rounded="md" shadow="md">
            {searching ? (
              '検索中...'
            ) : (
              <CheckboxGroup onChange={handleCheck} value={checked}>
                <List py={2}>
                  {users.map((u) => (
                    <ListItem w="full" p={2}>
                      <Account name={u.name} src={u.imagePath}>
                        <Flex alignItems="center">
                          <Text>{u.name}</Text>
                          <Spacer ml="1" flexGrow={1} />
                          <Checkbox value={u.id.toString()} />
                        </Flex>
                      </Account>
                    </ListItem>
                  ))}
                </List>
              </CheckboxGroup>
            )}
          </Box>
          <Spacer mt={4} />
          <Center>
            <Button
              size="sm"
              colorScheme="teal"
              onClick={() => handleInvite()}
              isLoading={inviting}
            >
              招待する
            </Button>
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchUserPopover;
