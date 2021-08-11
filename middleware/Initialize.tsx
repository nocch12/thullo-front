import { VFC, PropsWithChildren, useState, useEffect } from 'react';

import { getCsrf } from '../api/csrf';
import useUser from '../hooks/useUser';

const Initialize: VFC<PropsWithChildren<any>> = ({ children }) => {
  const [init, setInit] = useState(false);
  const { getUser } = useUser();

  useEffect(() => {
    const initAction = async () => {
      await getCsrf();
      await getUser();
      setInit(true);
    };
    initAction();
  }, []);

  return <>{init ? children : null}</>;
};

export default Initialize;
