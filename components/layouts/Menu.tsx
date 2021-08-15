import useUser from '../../hooks/useUser';
import { Icon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { VFC } from 'react';
import { MdMenu } from 'react-icons/md';

const NextMenuItem: VFC<MenuItemProps & { href: string }> = ({
  href,
  ...props
}) => (
  <NextLink href={href} passHref>
    <MenuItem {...props} />
  </NextLink>
);

const GuestMenu = (
  <>
    <MenuItem as="a" href="/register">
      登録
    </MenuItem>
    <NextMenuItem href="/register">登録</NextMenuItem>
    <NextMenuItem href="/login">ログイン</NextMenuItem>
  </>
);

const UserMenu = (
  <>
    <NextMenuItem href="/logout">ログアウト</NextMenuItem>
  </>
);

const HambergerMenu = () => {
  const { ifLoggedIn } = useUser();

  return (
    <Menu>
      <MenuButton
        ml={2}
        as={IconButton}
        aria-label="Options"
        icon={<Icon as={MdMenu} />}
        variant="outline"
        size="sm"
      />
      <MenuList>{ifLoggedIn(UserMenu, GuestMenu)}</MenuList>
    </Menu>
  );
};

export default HambergerMenu;
