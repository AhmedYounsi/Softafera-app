import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { RemoveMontant, removeMotif, SetMontant } from "../../actions";

import MotifPaiement from "../../components/MotifPaiement";
import ErrorMessage from "../../components/ErrorMessage";
import Calculator from "../../components/Calculator";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
function Paiement(props) {



  const [Montant, setMontant] = useState("");
  const [Modal, setModal] = useState(false);
  const [PaiementMode, setPaiementMode] = useState("");
  const [Height, setHeight] = useState(Dimensions.get("window").height);

  const [ColorPlaceholder, setColorPlaceholder] = useState("#737373");
  const [Error, setError] = useState(false);
  const [Somme, setSomme] = useState(0);

  const dispatch = useDispatch();


  useFocusEffect(
    useCallback(() => {
      dispatch(RemoveMontant())
      setMontant('')
      setSomme("")
    }, [])
  );

  // Set Montant
  const numbers = (num) => {
    setError(false);
    const operators = ["+", "-", "*", "/", "."];
    if (["*", "/"].includes(num) && Montant.length == 0) return;
    if (
      operators.includes(num) &&
      Montant.length > 0 &&
      operators.includes(Montant[Montant.length - 1])
    ) {
      return;
    }
    var arr = Montant;
    arr = `${arr}${num}`;
    setMontant(arr);

    if (Montant[0] == 0 && Montant.length == 1 && num != ".") {
      setMontant("");
    }
  };



  // Choisir le mode de paiement avec modal
  const payer = (mode) => {
    if (!evaluate() || evaluate() <= 0) {
      setError(true);
      return;
    }
    if (evaluate() == "Infinity") {
      setError(true);

      return;
    }
    setModal(true);
    setPaiementMode(mode);
  };

  // navigate to paiement mode
  const navigate_to_paiement = () => {

    props.navigation.navigate(PaiementMode);
    setModal(false)
  };

  const evaluate = () => {
    const operators = ["+", "-", "*", "/", "."];
    if (Montant.length == 0) return false;
    else if (Montant.length == 1 && [".", "+", "-"].includes(Montant)) {
      return false;
    } else if (Montant.length > 0 && operators.includes(Montant.slice(-1))) {
      const str = Montant.slice(0, -1);
      setMontant(eval(str).toFixed(2));
      setSomme(eval(str).toFixed(2));
      if (eval(str).toFixed(2) <= 0) {
        return false;
      }
      dispatch(SetMontant(eval(str).toFixed(2)));
      return str;
    } else {
      const somme = eval(Montant).toFixed(2);
      if (somme <= 0) {
        setMontant(somme);
        setSomme(somme);
        return false;
      }
      setMontant(`${somme}`);
      setSomme(somme);
      if (somme <= 0) {
        setError(true);
        return false;
      }
      dispatch(SetMontant(somme));
      return somme;
    }
  };

  const clear = () => {
    setError(false);
    setMontant("");
    setSomme(0);
    dispatch(RemoveMontant());
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {Error && <ErrorMessage errorText={"Montant non valide"} />}
      {Modal && (
        <>
          <ScrollView
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.homeView}
          >
            <MotifPaiement
              navigate_to_paiement={(id_motif) => navigate_to_paiement(id_motif)}
              annuler={() => {
                dispatch(removeMotif())
                setModal(false)
              }}
            />
          </ScrollView>
        </>
      )}
      <TextInput
        placeholder={"Saisir le motant à payer"}
        placeholderTextColor="grey"
        value={Montant}
        editable={false}
        keyboardType="numeric"
        style={[
          styles.input,
          Error && { borderColor: "red", borderWidth: 2, marginTop: 0 },
        ]}
        onChangeText={(text) => setMontant(text)}
      />

      {/* Calculator */}
      <Calculator
        Somme={Somme}
        numbers={(n) => numbers(n)}
        clear={() => clear()}
        evaluate={() => evaluate()}
      />
      <Text style={styles.textRegister}> ────── Moyens de paiement ──────</Text>
      {
        <View
          style={Modal ? styles.paiement_mode_disable : styles.paiement_mode}
        >
          <TouchableOpacity
            style={styles.icon_content}
            onPress={() => payer("PaiementparSMS")}
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../../assets/sms-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_content}
            onPress={() => payer("Paiementpare-mail")}
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../../assets/mail-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_content}
            onPress={() => payer("PaiementparCB")}
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../../assets/credit-card.png")}
            />
          </TouchableOpacity>
        </View>
      }
    </ScrollView>
  );
}

export default Paiement;
const styles = StyleSheet.create({
  scrollViewStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000099",
    zIndex: 99,
  },
  homeView: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
  text: {
    fontSize: 72,
  },
  icon_content: {
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  icon: {
    zIndex: 1,
    width: 70,
    height: 70,
  },
  paiement_mode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    maxWidth: 400,
  },
  paiement_mode_disable: {
    display: "none",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    maxWidth: 400,
  },
  textRegister: {
    marginVertical: 20,
    fontWeight: "500",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: "auto",
    height: 40,
    width: "80%",
    textAlign: "center",
    maxWidth: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontWeight: "500",
    fontSize: 20,
    color: "#1c1c1c",
  },
  error_input: {
    backgroundColor: "white",
    marginBottom: 20,
    marginHorizontal: "auto",
    height: 40,
    width: "80%",
    textAlign: "center",
    maxWidth: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "red",
    fontWeight: "500",
    fontSize: 17,
  },
});
