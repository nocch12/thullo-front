import { useState, Dispatch, SetStateAction, createContext, useContext, VFC } from 'react';

type User = undefined | {
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

  const value = {
    user, setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 