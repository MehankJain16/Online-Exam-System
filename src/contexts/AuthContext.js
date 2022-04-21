import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../constants";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();

  const getLoggedIn = async () => {
    const loggedInReq = await axios.post(`${api}/user/loggedin`);
    setLoggedIn(loggedInReq.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };

export default AuthContext;
