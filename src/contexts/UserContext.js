import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../constants";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const getUserDetails = async () => {
    const userReq = await axios.post(`${api}/user/user`);
    setUser(userReq.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };

export default UserContext;
