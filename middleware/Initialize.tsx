import { VFC, PropsWithChildren, useEffect } from 'react';

import useUser from '../hooks/useUser';
import { getCsrf } from '../api/csrf';


const Initialize: VFC<PropsWithChildren<{}>> = ({ children }) => {
  const { getUser } = useUser();

  useEffect(() => {
    const initAction = async () => {
      await getCsrf();
      await getUser();
    }
    initAction();
  }, []);

  return <>{ children }</>;
};

export default Initialize;
