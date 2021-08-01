import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, authInitState } from '../store/auth/authState';
import { getMe } from '../api/user';

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
