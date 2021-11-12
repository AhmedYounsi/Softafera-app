import AsyncStorage from "@react-native-async-storage/async-storage";
 
 
const TokenReducer = (state = null, action) => {
  switch (action.type) {
    case "TOKEN":
      AsyncStorage.setItem("TOKEN", action.payload);
      return action.payload;

    case "REMOVE_TOKEN":
      AsyncStorage.removeItem("TOKEN");
      return null;

    default:
      return state;
  }
};

export default TokenReducer;
