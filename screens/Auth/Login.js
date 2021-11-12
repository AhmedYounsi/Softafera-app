import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import ErrorMessage from '../../components/ErrorMessage'

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
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { SetProfile, SetToken } from '../../actions'
import Text_ from '../../components/Text_'
import axios from 'axios'
import URL from '../../Api/Url'

function Login(props) {
  const dispatch = useDispatch()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Selection, setSelection] = useState(false)
  const [Error, setError] = useState(false)
  const [ErrorText, setErrorText] = useState('')
  const [Loading, setLoading] = useState(false)

  const passwordInput = (text) => {
    setPassword(text)
  }

  const Login = async () => {

    if (Email.length == 0 && Password.length == 0) {
      setError(true)
      setErrorText('Veuillez saisir votre email et mot de passe!')
      return
    } else {
      setError(false)
    }
    if (Email.length == 0) {
      setError(true)
      setErrorText('Veuillez saisir votre email!')
      return
    }
    if (Password.length == 0) {
      setError(true)
      setErrorText('Veuillez saisir le mot de passe!')
      return
    }

    try {
      setLoading(true)
      const res = await axios.get(`${URL}/V0/GET_Profile`)
      const profiles = res.data

      setLoading(false)
      const mail_exist = profiles.find((el) => el.email == Email)

      if (!mail_exist) {
        setError(true)
        setErrorText('Adresse email invalide')
        setLoading(false)
        return
      }
      if (mail_exist.mot_de_passe != Password) {
        setError(true)
        setLoading(false)
        setErrorText('Mot de passe invalide')
        setPassword('')
        return
      } else {
        setLoading(false)
        setError(true)
        setErrorText('Login success')
        dispatch(SetToken(mail_exist.email));
        dispatch(SetProfile(mail_exist))

      }
    } catch (error) {
      setError(true)
      setLoading(false)
      setErrorText('Server error !')
    }


  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 40,
        }}
      >
        <View style={styles.login_container}>
          <Image
            style={styles.tinyLogo}
            resizeMode="contain"
            source={require('../../assets/logopay.png')}
          />

          <Text_
            text={'Se connecter'}
            style={{ fontSize: 18, marginTop: 10 }}
          />
          <View style={styles.Errorcontainer}>
            {Error && <ErrorMessage errorText={ErrorText} />}
          </View>

          <TextInput
            placeholder="Identifiant"
            placeholderTextColor="#737373"
            value={Email}
            style={
              Error && Email.length == 0 ? styles.error_input : styles.input
            }
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Mot de passe"
            placeholderTextColor="#737373"
            value={Password}
            style={
              Error && Password.length == 0 ? styles.error_input : styles.input
            }
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Se souvenir de moi ?</Text>
            <CheckBox
              value={Selection}
              onValueChange={setSelection}
              style={styles.checkbox}
              tintColors={{ true: '#233460' }}
            />
          </View>
          {
            Loading ?
              <TouchableOpacity
                style={styles.loginScreenButton}
              >
                <ActivityIndicator color="#ffffff" />
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => Login()}
                style={styles.loginScreenButton}
              >
                <MaterialIcons
                  style={styles.loginicon}
                  name="login"
                  size={30}
                  color="white"
                />
                <Text adjustsFontSizeToFit={true} style={styles.loginText}>
                  Login
                </Text>
              </TouchableOpacity>
          }

        </View>
        <View style={styles.footerAuth}>
          <Text_ text={'Développer par SOFTAVERA'} style={{ fontSize: 12 }} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Errorcontainer: {
    width: "100%",
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerAuth: {
    marginTop: 10,
    width: '90%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'center',
  },
  footerAuthText1: {
    fontWeight: '400',
    textDecorationLine: 'underline',
    paddingLeft: 10,
  },
  footerAuthText2: {
    fontWeight: '400',
    position: 'absolute',
    right: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 35,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  loginTitle: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '900',
    color: '#404040',
    marginBottom: 35,
  },
  tinyLogo: {
    width: 240,
    height: 140,
  },
  login_container: {
    borderWidth: 1,
    borderColor: '#23346038',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    width: '80%',
    maxWidth: 500,
    paddingVertical: 30,
    borderRadius: 20,
  },
  loginScreenButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    backgroundColor: '#233460',
    borderRadius: 30,
    borderWidth: 0,
    borderColor: '#fff',
    width: 200,
  },
  loginText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff',
  },

  input: {
    width: '90%',
    maxWidth: 400,
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
    height: 40,
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#233460',
    textAlign: 'center',
  },
  error_input: {
    width: '90%',
    maxWidth: 400,
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
    height: 40,
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: 'red',
    textAlign: 'center',
  },
})
