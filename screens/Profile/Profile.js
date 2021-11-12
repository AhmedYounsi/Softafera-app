import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import userIcon from '../../assets/icons/userIcon.png'
import Text_ from '../../components/Text_'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import URL from '../../Api/Url'
import { SetProfile } from '../../actions'

function Profile() {
  const dispatch = useDispatch()

  const ProfileReducer = useSelector((state) => state.ProfileReducer);
  useEffect(() => {
    console.log(ProfileReducer)
  }, [ProfileReducer])

  const [Nom, setNom] = useState(ProfileReducer.nom)
  const [Prenom, setPrenom] = useState('')
  const [Adresse, setAdresse] = useState(ProfileReducer.adresse)
  const [Mail, setMail] = useState(ProfileReducer.email)
  const [Tel, setTel] = useState(ProfileReducer.tel)
  const [Loading, setLoading] = useState(false)
  const [SuccessUpdate, setSuccessUpdate] = useState(false)


  useEffect(() => {
    setTimeout(() => {
      setSuccessUpdate(false)
    }, 5000);
  }, [SuccessUpdate])

  // UpdateUser
  const UpdateUser = async () => {

    const data = {
      id: ProfileReducer.id,
      nom: Nom.toLowerCase(),
      email: Mail.toLowerCase(),
      mot_de_passe: ProfileReducer.mot_de_passe,
      role: ProfileReducer.role,
      adresse: Adresse.toLowerCase(),
      date_creation: ProfileReducer.date_creation,
      tel: Tel,
      etat: ProfileReducer.etat,
      type_user: ProfileReducer.type_user
    }

    try {
      setLoading(true)
      const res = await axios.post(`${URL}/V0/PERSIST_Profile`, data)
      if (res.data) {
        dispatch(SetProfile(data))
        setSuccessUpdate(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)

    }

  }
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.title}>
        <Text_
          text={'Mes informations'}
          style={{ fontSize: 17, width: '60%', textAlign: 'center' }}
        />
        <AntDesign name="edit" size={30} color="black" />
      </View>
      <View>
        <Image style={{ width: 100, height: 120 }} source={userIcon} />
      </View>
      <Text_
        text={ProfileReducer.nom}
        style={{ fontSize: 20, color: '#606060', textAlign: 'center' }}
      />
      <View style={{ width: '90%', marginTop: 20 }}>
        {
          SuccessUpdate &&
          <Text_
            text={'Update avec succès'}
            style={{ fontSize: 17, marginBottom: 15, borderRadius: 30, color: "#028b00", backgroundColor: "#1f700b38", textAlign: 'center' }}
          />
        }
        <View style={styles.inputBox}>
          <Text style={styles.label}>Nom : </Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#737373"
            style={styles.input}
            value={Nom}
            onChangeText={(text) => setNom(text)}
          />
        </View>
        {/* <View style={styles.inputBox}>
          <Text style={styles.label}>Prenom : </Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#737373"
            style={styles.input}
            value={Prenom}
            onChangeText={(text) => setPrenom(text)}
          />
        </View> */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Adresse : </Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#737373"
            style={styles.input}
            value={Adresse}
            onChangeText={(text) => setAdresse(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>E-mail : </Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#737373"
            style={styles.input}
            value={Mail}
            onChangeText={(text) => setMail(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Telephone : </Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#737373"
            style={styles.input}
            value={Tel}
            onChangeText={(text) => setTel(text)}
          />
        </View>
      </View>
      {
        Loading ?
          <TouchableOpacity onPress={() => UpdateUser()} style={styles.saveBtn}>
            <ActivityIndicator size="small" color="#ffffff" />
          </TouchableOpacity>
          :

          <TouchableOpacity onPress={() => UpdateUser()} style={styles.saveBtn}>
            <MaterialIcons name="update" size={24} color="white" />
            <Text_
              text={'Update'}
              style={{
                fontSize: 17,
                marginLeft: 5,
                color: 'white',
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>
      }
    </ScrollView>
  )
}

export default Profile
const styles = StyleSheet.create({
  SaveText: {
    fontSize: 20,
    marginLeft: 5,
    color: '#fff',
  },
  saveBtn: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#233460',
    borderRadius: 30,
    borderWidth: 0,
    borderColor: '#fff',
    width: 150,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
    marginBottom: 20,
    flexDirection: 'row',
  },
  titleText: {
    marginBottom: 0,
    fontSize: 18,
    fontWeight: '500',
    color: '#1c1c1e',
    marginRight: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderColor: '#acacac',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  label: {
    width: '30%',
    textAlign: 'left',
    fontWeight: '700',
  },
  input: {
    width: '70%',
    maxWidth: 400,
    color: '#000000',
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#acacac',
    borderRadius: 20,
    textAlign: 'center',
  },
})
