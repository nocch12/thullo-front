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
        icon={<Icon as={MdMenu} />}
        variant="outline"
        size="sm"
      />
      <MenuList>{user ? UserMenu : GuestMenu}</MenuList>
    </Menu>
  );
};

export default HambergerMenu;
