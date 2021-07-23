import { VFC } from 'react';
import NextLink from 'next/link';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemProps,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useAuthContext } from '../../store/auth/AuthContext';

const NextMenuItem: VFC<MenuItemProps & { href: string }> = ({
  href,
  ...props
}) => (
  <NextLink href={href} passHref>
    <MenuItem {...props} />
  </NextLink>
);

const HambergerMenu = () => {
  const { user } = useAuthContext();

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
      <NextLink href="/logout" passHref>
        <NextMenuItem href="/logout">ログイン</NextMenuItem>
      </NextLink>
    </>
  );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>{user ? UserMenu : GuestMenu}</MenuList>
    </Menu>
  );
};

export default HambergerMenu;
