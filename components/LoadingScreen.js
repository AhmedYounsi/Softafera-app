import React from 'react'
import { Text, View ,StyleSheet,Image} from 'react-native'

function LoadingScreen() {
    return (
        <View  style={styles.container}>
           <Image
              style={styles.tinyLogo}
              resizeMode="contain"
              source={require("../assets/logopay.png")}
            />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d2d2d269",
      alignItems: "center",
      justifyContent: "center",
    },
    tinyLogo: {
      width: 240,
      height: 130,
    },

})
