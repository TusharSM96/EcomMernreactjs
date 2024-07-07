import React, { createContext, useEffect, useState } from "react";

const AuthLoginContext = createContext();
const AuthProviderWraper = ({ children }) => {
  const [Auth, setAuth] = useState({
    userData: null,
  });

  const [CartData, setCartData] = useState([]);
  useEffect(() => {
    let Data = sessionStorage.getItem("LoginDetails");
    if (Data) {
      const parseData = JSON.parse(Data);
      setAuth({ userData: parseData });
    } else {
      setAuth({ userData: null });
    }

    let CartData = localStorage.getItem("CartData");
    if (CartData) {
      let parseCartData = JSON.parse(CartData)
      setCartData(parseCartData);
    } else {
      setCartData([]);
    }
  }, []);

  return (
    <AuthLoginContext.Provider value={{ Auth, setAuth, CartData, setCartData }}>
      {children}
    </AuthLoginContext.Provider>
  );
};
export { AuthProviderWraper, AuthLoginContext };
