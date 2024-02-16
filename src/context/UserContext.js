import { createContext, use, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  const login = (paramsData) => {
      console.log("PASSS: "+localStorage.getItem("isLoggedIn"));
      if (localStorage.getItem("userData")) {
        const userDataStorage = JSON.parse(localStorage.getItem('userData'));
        setUserData(userDataStorage);
      }else{
        setUserData(paramsData);
      }
  };

  const logout = () => {
      setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);