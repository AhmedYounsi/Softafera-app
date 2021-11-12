import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Text_ from './Text_';

function ErrorMessage(props) {
    const  errorContainer = {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#ffd8d8',
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 20
    }
    return (
        <View style={{...errorContainer,width:props.widthError ? props.widthError : "90%"}}>
            <MaterialIcons style={{  }} name="error-outline" size={24} color="red" />
            {/* <Text style={styles.ErrorText}>
                {props.errorText}
            </Text> */}
            <Text_
          text=   {props.errorText}
          style={{color: 'red',
          fontSize: 16,
          marginLeft: 5,}}
        />
        </View>
    )
}

export default ErrorMessage


const styles = StyleSheet.create({
   errorContainer : {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#ffd8d8',
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 20,
        alignItems:'center'
    },
    ErrorText: {
        color: 'red',
        fontSize: 15,
        marginLeft: 5,

    }
})