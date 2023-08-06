import React, { createContext, useState, useRef, useEffect } from 'react';
import User from '../models/user';

type UserContextObj = {
  user: User | null;
  loginUser: (username: string, balance: number) => void;
};

export const UserContext = createContext<UserContextObj>({
  user: null,
  loginUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  function loginUser(username: string, balance: number): void {
    const newUser = new User(username, balance);
    setUser(newUser);
  }

  const contextValue: UserContextObj = {
    user: user,
    loginUser: loginUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
