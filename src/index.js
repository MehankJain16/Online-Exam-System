import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
