import { useContext, createContext, useState } from "react";

const StateContext = createContext();

const user = JSON.parse(localStorage.getItem("user"));

const initialCartState = user ? user.cart : [];
export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCartState);

  const [auth, setAuth] = useState({
    user: user ? user : null,
  });
  return (
    <StateContext.Provider
      value={{
        cart,
        setCart,
        auth,
        setAuth,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
