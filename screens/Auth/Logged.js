import axios from "axios";
import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  Button,
  Image,
  Settings,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Profile from "../Profile/Profile";
import Historique from "../Historique/Historique";
import Home from "../Home/Home";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { RemoveToken } from "../../actions";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Logged() {


  let [fontsLoaded] = useFonts({
    'Kanit': require('../../assets/fonts/Kanit-SemiBold.ttf'),
  });
  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();

  const logout = () => {
    dispatch(RemoveToken());
  };
  const CustomDrawer = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.logocontainer}>
            <Image
              style={styles.tinyLogo}
              resizeMode="contain"
              source={require("../../assets/logopay.png")}
            />
          </View>

          <DrawerItemList {...props} />
          <TouchableOpacity
            onPress={() => logout()}
            style={styles.logoutcontainer}
          >
            <MaterialCommunityIcons name="logout" size={35} color="#96979a" />
            <Text style={styles.logouttext}>Déconnexion</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>

      </View>
    );
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: { backgroundColor: "#233460", height: 50 },
              headerTintColor: "#fff",
              style: {
                backgroundColor: "red",
              },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
            initialRouteName="Home"
          >
            <Drawer.Screen
              options={{
                title: "Paiement",
                drawerLabelStyle: {
                  fontSize: 20, fontFamily: 'Kanit'
                },

                drawerActiveTintColor: "#233460",
                drawerActiveBackgroundColor: "#eaeaea",
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons
                    name="payment"
                    size={35}
                    color={focused ? "#233460" : "#96979a"}
                  />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Drawer.Screen
              options={{
                title: "Profil",
                drawerLabelStyle: {
                  fontSize: 20, fontSize: 20, fontFamily: 'Kanit'
                },
                drawerActiveTintColor: "#233460",
                drawerActiveBackgroundColor: "#eaeaea",
                drawerIcon: ({ focused, size }) => (
                  <Feather
                    name="user"
                    size={35}
                    color={focused ? "#233460" : "#96979a"}
                  />
                ),
              }}
              name="Profile"
              component={Profile}
            />
            <Drawer.Screen
              options={{
                title: "Historique",
                drawerLabelStyle: {
                  fontSize: 20, fontSize: 20, fontFamily: 'Kanit'
                },
                drawerActiveTintColor: "#233460",
                drawerActiveBackgroundColor: "#eaeaea",
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome
                    name="history"
                    size={35}
                    color={focused ? "#233460" : "#96979a"}
                  />
                ),
              }}
              name="Historique"
              component={Historique}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </>
    );
}

export default Logged;

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
    paddingLeft: 7,
    margin: 10,
    height: 53,

    borderRadius: 5
  },
  logouttext: {
    color: "#1c1c1ead",
    marginLeft: 27,
    fontFamily: "sans-serif",
    fontSize: 20,
    fontFamily: 'Kanit'
  },
});
