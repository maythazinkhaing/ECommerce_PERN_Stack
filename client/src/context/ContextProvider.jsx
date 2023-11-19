import { useState, useContext, createContext } from "react";

const StateContext = createContext();

const user = JSON.parse(localStorage.getItem("user"));

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: user ? user : null,
    isSuccess: false,
  });
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
