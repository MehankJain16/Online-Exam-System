import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../constants";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const { getUserDetails } = useContext(UserContext);

  const signup = async () => {
    if (!fullname || !emailId || !password || !role) {
      toast("fill all the details", {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
        type: "info",
      });
      return;
    }

    try {
      const signupReq = await axios.post(`${api}/user/register`, {
        name: fullname,
        email: emailId,
        password,
        role,
      });
      if (signupReq.data.success && signupReq.data.error === null) {
        toast("account created successfully!", {
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
        <h4 className="font-bold text-white text-left text-4xl">Sign Up</h4>
        <div className="flex gap-5 flex-col my-10">
          <Input
            placeholder={"fullname"}
            type={"text"}
            val={fullname}
            setVal={setFullname}
          />
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
          <select
            value={role}
            onChange={(val) => setRole(val.target.value)}
            className={`p-2 h-10 bg-primary border-none outline-none rounded-md ${
              role === "" ? "text-white50" : "text-white"
            } font-medium`}
            placeholder="select role">
            <option value={""}>select role</option>
            <option value={"user"}>User</option>
            <option value={"company"}>School / Organisation</option>
          </select>
        </div>
        <Button title={"Submit"} onClick={signup} />
        <Link
          to={"/login"}
          replace={true}
          className="text-white80 font-bold text-base mt-2 cursor-pointer text-center">
          Already have an account ? Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
