import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { RemoveToken, SetToken, SetProfile } from "../actions/index";
import LoadingScreen from "../components/LoadingScreen";

import Logged from "./Auth/Logged";
import NotLogged from './Auth/NotLogged'
function LandingPage() {
  const dispatch = useDispatch()
  const [Islogged, setIslogged] = useState("");

  const TokenReducer = useSelector((state) => state.TokenReducer);



  const get_stored_token = async () => {
    const token_stored = await AsyncStorage.getItem("TOKEN");
    const Profile_stored = await AsyncStorage.getItem("PROFILE");

    if (token_stored && Profile_stored) {
      setIslogged("logged")
      dispatch(SetToken(token_stored))
      dispatch(SetProfile(JSON.parse(Profile_stored)))
    }
    else setIslogged("not_logged");
  };
  useEffect(() => {
    get_stored_token();

  }, [TokenReducer])
  useEffect(() => {
    get_stored_token();

    return () => { };
  }, []);


  const logout = () => {
    dispatch(RemoveToken());
  };
  return (


    <>
      {Islogged == "logged" && <Logged />}
      {Islogged == "not_logged" && <NotLogged />}
      {Islogged == "" && <LoadingScreen />}
    </>













  );
}

export default LandingPage;
