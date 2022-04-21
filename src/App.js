import React from "react";
import Router from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AuthContextProvider>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
