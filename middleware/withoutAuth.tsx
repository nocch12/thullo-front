import { useRouter } from 'next/router';
import { VFC, useState, useEffect } from 'react';

import useUser from '../hooks/useUser';

const withoutAuth = (Component: VFC) => {
  return (props: unknown) => {
    const [checked, setChecked] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
      if (user) {
        router.replace('/');
      } else {
        setChecked(true);
      }
    }, [user]);

    return checked ? <Component {...props} /> : null;
  };
};

export default withoutAuth;
