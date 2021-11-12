import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import Login from "./Login";
import Register from "./Register";

function NotLogged() {
  const [LoginRegister, setLoginRegister] = useState("Login");
 
 
  const to_register = () => {
    setLoginRegister("Register");
  };
  const to_login = () => {
    setLoginRegister("Login");
  };
  return (
 
    <>
 
      {LoginRegister === "Login" && <Login to_register={() => to_register()} />}
      {LoginRegister === "Register" && <Register to_login={() => to_login()} />}
    </>
 
  );
}

export default NotLogged;
