import { useRecoilState, useSetRecoilState } from 'recoil';

import { getMe } from '../api/user';
import { userState, authInitState } from '../store/auth/authState';

const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const setAuthInit = useSetRecoilState(authInitState);

  const getUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch (e) {
      setUser(null);
    } finally {
      setAuthInit(true);
    }
  };

  return { user, setUser, getUser };
};

export default useUser;
