import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userStateChanged, setUserStateChanged] = useState(false);
  const [newBalance, setNewBalance] = useState(0);

  const value = {
    user,
    setUser,
    userStateChanged,
    setUserStateChanged,
    newBalance,
    setNewBalance,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
