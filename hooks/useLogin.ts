import { useState } from 'react';
import useUser from './useUser';
import { login as loginApi } from '../api/user';

const useLogin = () => {
  const [error, setError] = useState<unknown>(null);
  const { setUser } = useUser();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginApi(email, password);
      setUser(data.user);
    } catch (e) {
      setError(e);
    }
  };

  return { error, login };
};

export default useLogin;
