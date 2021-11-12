import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ErrorMessage from "./ErrorMessage";
import { setMotif } from "../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import URL from '../Api/Url'

function MotifPaiement(props) {

  const dispatch = useDispatch()
  const [InfoDisplay, setInfoDisplay] = useState("");
  const [Error, setError] = useState(false);
  const [numero, setnumero] = useState("");
  const [clientId, setclientId] = useState("");
  const [AutreMotif, setAutreMotif] = useState("");
  const [error_champs, seterror_champs] = useState("");
  const [Loading, setLoading] = useState(false)
  const IconCheck = () => {
    return (
      <FontAwesome
        style={{ position: "absolute", right: 15 }}
        name="check"
        size={24}
        color="#233460"
      />
    );
  };
  const [Height, setHeight] = useState(Dimensions.get("window").height);
  useEffect(() => {
    switch (InfoDisplay) {
      case "Facture":
        dispatch(setMotif(1))
        break;
      case "Bon_commande":
        dispatch(setMotif(2))
        break;
      case "Acompte":
        dispatch(setMotif(3))
        break;
      case "Impaye":
        dispatch(setMotif(4))
        break;

      default:
        break;
    }


    setError(false);
    setAutreMotif("");
    setclientId("");
    setnumero("");
  }, [InfoDisplay]);



  const continuer = async () => {
    if (InfoDisplay == "Autre")
      dispatch(setMotif(AutreMotif))

    if (!InfoDisplay) {
      setError(true);
      return;
    }

    if (numero.length == 0 && clientId.length == 0) {
      seterror_champs("champs vide !");
      setError(true);
    }

    if (numero.length == 0 && clientId.length > 0) {
      seterror_champs("numéro vide !");
      setError(true);
    }

    if (numero.length > 0 && clientId.length != 6) {
      seterror_champs("client id invalide !");
      setError(true);
    }

    if (numero.length > 0 && clientId.length == 6) {
      setError(false);
      props.navigate_to_paiement();
    }




    if (AutreMotif.length > 0 && InfoDisplay == "Autre") {
      setError(false);
      setLoading(true)
      try {
        const res = await axios.post(`${URL}/V0/PERSIST_motif_transaction`,
          {
            motif: AutreMotif
          }
        )
        if (res.data) {
          const id_motif = res.data
          dispatch(setMotif(id_motif))
          setLoading(false)
          props.navigate_to_paiement();
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }


    }
  };
  return (
    <View style={styles.modal}>
      <Text style={styles.title}>Motif de Paiement</Text>
      {Error && InfoDisplay.length == 0 && (
        <ErrorMessage errorText={"Veuillez sélectionner un motif !"} />
      )}

      <TouchableOpacity
        onPress={() => setInfoDisplay("Facture")}
        style={styles.mode}
      >
        <FontAwesome name="dot-circle-o" size={25} color="#233460" />
        <Text style={styles.mode_text}>Paiement Facture</Text>
        {InfoDisplay === "Facture" && <IconCheck />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setInfoDisplay("Bon_commande")}
        style={styles.mode}
      >
        <FontAwesome name="dot-circle-o" size={25} color="#233460" />

        <Text style={styles.mode_text}>Paiement Bon commande</Text>
        {InfoDisplay === "Bon_commande" && <IconCheck />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setInfoDisplay("Acompte")}
        style={styles.mode}
      >
        <FontAwesome name="dot-circle-o" size={25} color="#233460" />

        <Text style={styles.mode_text}>Paiement Acompte</Text>
        {InfoDisplay === "Acompte" && <IconCheck />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setInfoDisplay("Impaye")}
        style={styles.mode}
      >
        <FontAwesome name="dot-circle-o" size={25} color="#233460" />

        <Text style={styles.mode_text}>Paiement Impaye</Text>
        {InfoDisplay === "Impaye" && <IconCheck />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setInfoDisplay("Autre")}
        style={styles.mode}
      >
        <FontAwesome name="dot-circle-o" size={25} color="#233460" />

        <Text style={styles.mode_text}>Autre</Text>
        {InfoDisplay === "Autre" && <IconCheck />}
      </TouchableOpacity>

      {InfoDisplay === "Autre" && (
        <View style={{ width: "90%" }}>
          {Error && <ErrorMessage widthError={"100%"} errorText={"Veuillez saisir le motif !"} />}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{ width: "30%", textAlign: "left", fontWeight: "700" }}
            >
              Motif :{" "}
            </Text>
            <TextInput
              value={AutreMotif}
              onChangeText={(text) => setAutreMotif(text)}
              placeholder="Saisir ..."
              placeholderTextColor="#737373"
              style={styles.input}
            />
          </View>
        </View>
      )}
      {InfoDisplay != "" && InfoDisplay != "Autre" && (
        <>
          <View style={{ width: "90%" }}>
            {Error && <ErrorMessage widthError={"100%"} errorText={error_champs} />}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{ width: "30%", textAlign: "left", fontWeight: "700" }}
              >
                Numéro :{" "}
              </Text>
              <TextInput
                value={numero}
                onChangeText={(text) => setnumero(text)}
                placeholder="Saisir ..."
                placeholderTextColor="#737373"
                style={styles.input}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ width: "30%", textAlign: "left", fontWeight: "700" }}
              >
                Client ID :{" "}
              </Text>
              <TextInput
                value={clientId}
                onChangeText={(text) => setclientId(text)}
                placeholder="Saisir ..."
                placeholderTextColor="#737373"
                style={styles.input}
              />
            </View>
          </View>
        </>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          title="Annuler"
          onPress={() => props.annuler()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Annuler</Text>
        </TouchableOpacity>

        {
          Loading ?
            <TouchableOpacity
              style={styles.btn}
            >
              <ActivityIndicator size="small" color="#ffffff" />
            </TouchableOpacity>
            :
            <TouchableOpacity
              title="Annuler"
              onPress={() => continuer()}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Continuer</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  );
}

export default MotifPaiement;
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#233460",
    width: 124,
    height: 40,
    justifyContent: 'center'
  },
  btnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    paddingBottom: 20,
    color: "black",
  },
  mode: {
    width: "100%",
    paddingLeft: 15,
    height: 50,
    display: "flex",
    marginBottom: 10,
    flexDirection: "row",
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    alignItems: "center",
  },
  mode_text: {
    marginLeft: 10,
    color: "black",
    fontSize: 18,
  },
  input: {
    width: "70%",
    maxWidth: 400,
    color: "#000000",

    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#898989a6",
    textAlign: "center",
  },
});
