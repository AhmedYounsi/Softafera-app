import React ,{useEffect,useState} from 'react'
import {Text} from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
 
    

function Text_(props) {
 
  let [fontsLoaded] = useFonts({
    'StickNoBills': require('../assets/fonts/StickNoBills-Medium.ttf'),
    'Kanit': require('../assets/fonts/Kanit-SemiBold.ttf'),
  });

 if (!fontsLoaded) {
  return <AppLoading />;
} else
    return (
       
      <Text style={{ ...props.style ,fontFamily: "Kanit"}}>
     {props.text}
    </Text>
     
          
    )
}

export default Text_
