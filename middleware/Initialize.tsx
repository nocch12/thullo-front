import { VFC, PropsWithChildren, useState, useEffect } from 'react';

import useUser from '../hooks/useUser';
import { getCsrf } from '../api/csrf';


const Initialize: VFC<PropsWithChildren<{}>> = ({ children }) => {
  const [initCsrf, setInitCsrf] = useState(false);
  const { user, getUser } = useUser();

  const csrfAction = async () => {
    try {
      await getCsrf();
      setInitCsrf(true);
    } catch (e) {

    }
  }

  useEffect(() => {
    const initAction = async () => {
      await csrfAction();
      getUser();
    }
    initAction();
  }, []);

  const init = initCsrf && user !== undefined;

  return <>{init ? children : null}</>;
};

export default Initialize;
