import { getMe } from '../api/user';
import { userState, authInitState } from '../store/auth/authState';
import { useRecoilState, useSetRecoilState } from 'recoil';

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

  const ifLoggedIn = (t: unknown, f: unknown = null) => {
    return user ? t : f;
  };

  return { user, setUser, getUser, ifLoggedIn };
};

export default useUser;
