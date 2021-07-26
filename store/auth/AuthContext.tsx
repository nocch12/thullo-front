import { useState, useEffect, Dispatch, SetStateAction, createContext, useContext, VFC } from 'react';

import { getMe } from '../../api/user';

type User = undefined | null | {
  name: string;
};

type TAuthContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultContext: TAuthContext = {
  user: undefined,
  setUser: (user: User) => {}
};

export const AuthContext = createContext<TAuthContext>(defaultContext);

export const useAuthContext = () => useContext(AuthContext);

type Props = {
  children: JSX.Element;
}
export const AuthProvider: VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    const auth = async () => {
      try {
        const { data } = await getMe(); 
        setUser(data.user);
      } catch (e) {
        setUser(null);
      }
    }
    auth();
  }, []);

  const value = {
    user, setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {user !== undefined && children}
    </AuthContext.Provider>
  )
} 