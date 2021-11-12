import React, { useState, useCallback } from "react";
import { Button, Text, View } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaiementSMS from "../Paiement/PaiementSMS";
import Paiement from "../Paiement/Paiement";
import PaiementMail from "../Paiement/PaiementMail";
import PaiementCB from "../Paiement/PaiementCB";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import URL from '../../Api/Url'
import { useFocusEffect } from "@react-navigation/core";
import { RemoveMontant } from '../../actions/index'

import axios from 'axios'
function Home() {
  const Stack = createNativeStackNavigator();
  const MotifReducer = useSelector((state) => state.MotifReducer);
  const ProfileReducer = useSelector((state) => state.ProfileReducer);
  const [Loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();



  useFocusEffect(
    useCallback(() => {
      navigation.navigate("Paiement")
      return () => {
        setLoading(false)
      }
    }, [])

  );


  // Payer
  const Payer = async (data) => {

    setLoading(true)
    const myUuid = uuid();


    const trans = {
      refrence_transaction: "REF-" + myUuid.substring(0, 7),
      montant: data.montant,
      type_paiement: data.type,
      id_motif_transaction: MotifReducer,
      id_profile: ProfileReducer.id,
      email: data.email ? data.email : '',
      telephone: data.tel ? data.tel : '',
      paiement_effectuer: false,
      date_transaction: new Date(),

    }
    console.log(trans)

    try {
      const res = await axios.post(`${URL}/V0/PERSIST_Transaction`, trans)
      if (res.data) {
        setLoading(false)
        navigation.navigate("Historique")
      }
    } catch (error) {
      setLoading(false)
    }

  }
  return (
    <Stack.Navigator

      screenOptions={{
        headerStyle: { height: 40 },

      }}
    >
      <Stack.Screen

        name="Paiement"
        component={Paiement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen options={{ title: "Paiement par SMS" }} name="PaiementparSMS"  >
        {() => <PaiementSMS Loading={Loading} Payer={(type) => Payer(type)} />}
      </Stack.Screen>
      <Stack.Screen options={{ title: "Paiement par Mail" }} name="Paiementpare-mail">
        {() => <PaiementMail Loading={Loading} Payer={(type) => Payer(type)} />}
      </Stack.Screen>
      <Stack.Screen options={{ title: "Paiement par CB" }} name="PaiementparCB">
        {() => <PaiementCB Payer={(type) => Payer(type)} Loading={Loading} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Home;
