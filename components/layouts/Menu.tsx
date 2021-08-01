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

import useUser from '../../hooks/useUser';

const NextMenuItem: VFC<MenuItemProps & { href: string }> = ({
  href,
  ...props
}) => (
  <NextLink href={href} passHref>
    <MenuItem {...props} />
  </NextLink>
);

const HambergerMenu = () => {
  const { user } = useUser();

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
