import { useState } from 'react';
import useUser from './useUser';
import { register as registerApi } from '../api/user';

const useRegister = () => {
  const [error, setError] = useState<unknown>(null);
  const { setUser } = useUser();

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await registerApi(email, password);
      setUser(data.user);
    } catch (e) {
      setError(e);
    }
  };

  return { error, register };
};

export default useRegister;
