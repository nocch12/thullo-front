import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from '../Link';

const HambergerMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem as={Link} href="/login">Login</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HambergerMenu;
