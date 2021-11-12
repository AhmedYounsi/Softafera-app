import axios from "axios";
import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  Button,
  Image,
  Settings,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Login from "./screens/Auth/Login";
import NotLogged from "./screens/Auth/NotLogged";
import Register from "./screens/Auth/Register";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Profile from "./screens/Profile/Profile";
import Historique from "./screens/Historique/Historique";
import Home from "./screens/Home/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// REDUX

import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import TokenReducer from "./reducers/TokenReducer";
import MontantReducers from './reducers/MontantReducers'
import { combineReducers } from "redux";
import LandingPage from "./screens/LandingPage";
import ProfileReducer from "./reducers/ProfileReducer";
import MotifReducer from "./reducers/MotifReducer";

export default function App() {
  const Drawer = createDrawerNavigator();


  // REDUX Settings
  const AllReducers = combineReducers({
    TokenReducer: TokenReducer,
    MontantReducers: MontantReducers,
    ProfileReducer: ProfileReducer,
    MotifReducer: MotifReducer
  });
  const store = createStore(
    AllReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  // END REDUX Settings





  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 240,
    height: 130,
  },
  logocontainer: {
    borderBottomWidth: 1,
    borderColor: "#dedede",
    paddingVertical: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoutcontainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffbcbc",
    paddingLeft: 10,
  },
  logouttext: {
    color: "#f44336",
    marginLeft: 5,
    fontFamily: "sans-serif",
    fontSize: 20,
  },
});
