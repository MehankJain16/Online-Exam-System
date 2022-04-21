import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../constants";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";

const Signin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const { getUserDetails } = useContext(UserContext);

  const signin = async () => {
    if (!emailId || !password) {
      toast("fill all the details", {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "info",
      });
      return;
    }

    try {
      const signinReq = await axios.post(`${api}/user/login`, {
        email: emailId,
        password,
      });
      if (signinReq.data.success && signinReq.data.error === null) {
        toast("login success!", {
          hideProgressBar: true,
          autoClose: 2000,
          theme: "dark",
          type: "success",
        });
        await getLoggedIn();
        await getUserDetails();
        return;
      }
    } catch (error) {
      toast(error.response.data.error, {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "error",
      });
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gradient-to-br from-boxBgStart to-boxBgEnd px-5 py-8 shadow-md rounded-lg flex flex-col w-11/12 md:w-1/4">
        <h4 className="font-bold text-white text-left text-4xl">Sign In</h4>
        <div className="flex gap-5 flex-col my-10">
          <Input
            placeholder={"email id"}
            type={"text"}
            val={emailId}
            setVal={setEmailId}
          />
          <Input
            placeholder={"password"}
            type={"password"}
            val={password}
            setVal={setPassword}
          />
        </div>
        <Button title={"Submit"} onClick={signin} />
        <Link
          to={"/register"}
          replace={true}
          className="text-white80 font-bold text-base mt-2 cursor-pointer text-center">
          Don't have an account ? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
