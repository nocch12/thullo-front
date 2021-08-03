import { VFC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';

const withAuth = (Component: VFC) => {
  return (props: unknown) => {
    const [checked, setChecked] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        router.replace('/login');
      } else {
        setChecked(true);
      }
    }, [user]);

    return checked ? <Component {...props} /> : null;
  };
};

export default withAuth;
