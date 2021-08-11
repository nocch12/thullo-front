import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { logout as logoutApi } from '../api/user';
import useUser from '../hooks/useUser';

const logout = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      logoutApi();
      setUser(null);
    }
    router.replace('/login');
  }, [router]);

  return null;
}

export default logout;
