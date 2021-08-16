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

const CHECK_NAME = 'user-check';

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
    handleCheck([]);
    setSearchInput('');
    setUsers([]);
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
    setUsers((prev) =>
      prev.filter((user) => !checked.includes(user.id.toString()))
    );
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
          <Box rounded="md" shadow="md" p={2}>
            {searching ? (
              '検索中...'
            ) : users.length === 0 ? (
              'ユーザーが見つかりませんでした'
            ) : (
              <CheckboxGroup onChange={handleCheck} value={checked}>
                <List>
                  {users.map((u) => (
                    <ListItem w="full" key={u.id.toString()}>
                      <Box
                        as="label"
                        htmlFor={CHECK_NAME + u.id}
                        p={2}
                        display="block"
                      >
                        <Account as="label" name={u.name} src={u.imagePath}>
                          <Flex alignItems="center">
                            <Text>{u.name}</Text>
                            <Spacer ml="1" flexGrow={1} />
                            <Checkbox
                              id={CHECK_NAME + u.id}
                              value={u.id.toString()}
                            />
                          </Flex>
                        </Account>
                      </Box>
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
