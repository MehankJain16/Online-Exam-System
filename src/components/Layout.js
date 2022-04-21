import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../constants";
import UserContext from "../contexts/UserContext";
import AuthContext from "../contexts/AuthContext";
import SideNavItem from "./SideNavItem";
import { useHistory } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const logoutbtn = async () => {
    await axios.post(`${api}/user/logout`);
    toast("logged out successfully!", {
      autoClose: 2000,
      hideProgressBar: true,
      theme: "dark",
      type: "success",
    });
    history.replace("/");
    await getLoggedIn();
    return;
  };

  return (
    <div className="flex">
      {user && (
        <div className="bg-gradient-to-br from-boxBgStart to-boxBgEnd w-1/4 h-screen p-8">
          <div className="flex gap-4">
            <div className="rounded-full w-16 h-16 bg-primary flex justify-center items-center text-2xl text-white80">
              {user.name.split(" ")[0] &&
                user.name.split(" ")[0].split("")[0].toUpperCase()}
              {user.name.split(" ").length > 1 &&
                user.name.split(" ")[1] !== "" &&
                user.name.split(" ")[1].split("")[0].toUpperCase()}
            </div>
            <div className="flex flex-col justify-center items-star">
              <h4 className="text-white font-bold text-2xl">{user.name}</h4>
              <p className="text-white50 font-medium text-sm">{user.email}</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-8">
            {user.role === "user" ? (
              <React.Fragment>
                <SideNavItem
                  title={"Available Tests"}
                  to={"/"}
                  active={window.location.pathname === "/"}
                />
                <SideNavItem
                  title={"History"}
                  to={"/testHistory"}
                  active={window.location.pathname === "/testHistory"}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SideNavItem
                  title={"My Tests"}
                  to={"/"}
                  active={window.location.pathname === "/"}
                />
                <SideNavItem
                  title={"Create Test"}
                  to={"/createTest"}
                  active={window.location.pathname === "/createTest"}
                />
                <SideNavItem
                  title={"Test Records"}
                  to={"/testRecords"}
                  active={window.location.pathname === "/testRecords"}
                />
                <SideNavItem
                  title={"Questions"}
                  to={"/allQuestions"}
                  active={window.location.pathname === "/allQuestions"}
                />
              </React.Fragment>
            )}
            <button
              onClick={logoutbtn}
              className={`text-white80 text-lg font-semibold block p-2 rounded-md w-full text-left`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <div className="p-8 w-full">{children}</div>
    </div>
  );
};

export default Layout;
