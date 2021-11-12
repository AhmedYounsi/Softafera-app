import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  CheckBox,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Feather } from '@expo/vector-icons';
import ErrorMessage from '../../components/ErrorMessage'
import Text_ from "../../components/Text_";

function Register(props) {
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Selection, setSelection] = useState(false);
  const [Error, setError] = useState(false)
  const [ErrorText, setErrorText] = useState("")
  const emailInput = (text) => {
    setEmail(text);
  };

  const passwordInput = (text) => {
    setPassword(text);
  };


  const Register = () => {
    if (Nom.length == 0 && Prenom.length == 0 && Email.length == 0 && Password.length == 0) {
      setError(true)
      setErrorText("Champs vides !")
      return
    }
    else {
      setError(false)
    }
    if (Nom.length == 0) {
      setError(true)
      setErrorText("Nom vide !")
      return
    }
    if (Prenom.length == 0) {
      setError(true)
      setErrorText("Prenom vide !")
      return
    }
    if (Email.length == 0) {
      setError(true)
      setErrorText("Email vide !")
      return
    }
    if (Password.length == 0) {
      setError(true)
      setErrorText("Password vide !")
      return
    }



  }

  return (

    <View style={{flex:1}}>
   <ScrollView contentContainerStyle={{flexGrow:1,alignItems:'center',justifyContent:'center',  paddingVertical:40}}>
      <View style={styles.login_container}>
        <Image
          style={styles.tinyLogo}
          resizeMode="contain"
          source={require("../../assets/logopay.png")}
        />
          <Text_ text={"Créer un compte "} style={{marginVertical:20,fontSize:20}}  />
    
        {
          Error && <ErrorMessage  errorText={ErrorText} />
        }
        <TextInput
          placeholder="Entrer votre nom"
          placeholderTextColor="#737373"
          value={Nom}
          style={Error && Nom.length == 0 ? styles.error_input : styles.input}
          onChangeText={(text) => setNom(text)}
        />
        <TextInput
          placeholder="Entrer votre prenom"
          placeholderTextColor="#737373"
          value={Prenom}
          style={Error && Prenom.length == 0 ? styles.error_input : styles.input}
          onChangeText={(text) => setPrenom(text)}
        />
        <TextInput
          placeholder="Entrer votre mail"
          placeholderTextColor="#737373"
          value={Email}
          style={Error && Email.length == 0 ? styles.error_input : styles.input}

          onChangeText={(text) => emailInput(text)}
        />

        <TextInput
          secureTextEntry={true}
          placeholder="Entrer votre mot de passe"
          placeholderTextColor="#737373"
          value={Password}
          style={Error && Password.length == 0 ? styles.error_input : styles.input}

          onChangeText={(text) => passwordInput(text)}
        />

        <TouchableOpacity onPress={() => Register()} style={styles.loginScreenButton}>
          <Feather style={styles.registericon} name="user-plus" size={24} color="white" />
          <Text adjustsFontSizeToFit={true} style={styles.loginText}>

            Register
            </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerAuth}>
        <TouchableOpacity onPress={() => props.to_login()}>
     
          <Text_ text={"Déja inscrit ?"} style={{fontSize:15}}  />
        </TouchableOpacity>
        <View style={styles.footerAuthText2}>
      
          <Text_ text={" Développer par : SOFIAVERA"} style={{fontSize:12}}  />
        </View>
      </View>
    </ScrollView>
    </View>

  );
}

export default Register;

const styles = StyleSheet.create({

 
  text: {
    fontSize: 42,
  },
  scroll: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  footerAuth: {
    marginTop: 10,
    width: "90%",
    maxWidth: 500,
    display: "flex",
    flexDirection: "row",
    alignItems:'center'
  },
  footerAuthText1: {

    fontWeight: "400",
    textDecorationLine: "underline",
    marginRight: 10,
    fontSize: 14
  },
  footerAuthText2: {
    fontWeight: "400",
    position: "absolute",
    right: 10,
    fontSize: 13
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  loginTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "900",
    color: "#404040",
    marginBottom:35
  },
  tinyLogo: {
    width: 240,
    height: 140,
  },
  login_container: {
    
    borderWidth: 1,
    borderColor: "#23346038",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",

    width: "80%",
    maxWidth: 500,
    paddingVertical: 30,
    borderRadius: 20,
  },
  loginScreenButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    backgroundColor: "#233460",
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "#fff",
    width: 200,
    marginTop:35
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    marginLeft: 10
  },

  input: {
    width: "90%",
    maxWidth: 400,
    color: "#000000",
    marginBottom: 15,
    textAlign: "center",
    height: 40,
  fontSize:20,
    borderBottomWidth: 2,
    borderColor: "#233460",
    textAlign: "center",
  },

  error_input: {
    width: "90%",
    maxWidth: 400,
    color: "#000000",
    marginBottom: 15,
    textAlign: "center",
    height: 40,
    fontSize:20,
    borderBottomWidth: 2,
    borderColor: "red",
    textAlign: "center",
  },
});
