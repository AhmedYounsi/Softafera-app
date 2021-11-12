import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Text_ from "../../components/Text_";

function PaiementCB(props) {
  const [NumCard, setNumCard] = useState("");
  const [DateExp, setDateExp] = useState("");
  const [CVV, setCVV] = useState("");
  const MontantReducers = useSelector((state) => state.MontantReducers);
  const [Error, setError] = useState(false);
  const [error_text, seterror_text] = useState("invalid");

  const Valider = () => {
    if (NumCard.length == 0 && CVV.length == 0 && DateExp.length == 0) {
      setError(true);
      seterror_text("champs vides");
      return;
    } else {
      setError(false);
    }
    if (NumCard.length == 0) {
      setError(true);
      seterror_text("Numéro de carte vide");
      return;
    }
    if (DateExp.length == 0) {
      setError(true);
      seterror_text("DateExp vide");
      return;
    }
    if (CVV.length == 0) {
      setError(true);
      seterror_text("CVV vide");
      return;
    }
    props.Payer({ type: 3, montant: MontantReducers })

  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.montant}>
        <Text_
          text={"Montant à payer : "}
          style={{ fontSize: 17, width: "50%", textAlign: "center" }}
        />

        <Text_
          text={MontantReducers + " DT"}
          style={{ fontSize: 20, color: "#de0000", width: "50%", textAlign: 'center' }}
        />
      </View>
      <View style={styles.image}>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../../assets/credit-card.png")}
        />
      </View>
      {Error && <ErrorMessage errorText={error_text} />}
      <View style={styles.inputView}>
        <Entypo
          style={styles.iconInput}
          name="credit-card"
          size={30}
          color="#a4a4a4"
        />
        <TextInput
          placeholder="numéro de carte"
          placeholderTextColor="#737373"
          value={NumCard}
          style={
            Error && NumCard.length == 0 ? styles.error_input : styles.input
          }
          onChangeText={(text) => setNumCard(text)}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialIcons
          style={styles.iconInput}
          name="date-range"
          size={30}
          color="#a4a4a4"
        />
        <TextInput
          placeholder="date d'éxpiration"
          placeholderTextColor="#737373"
          value={DateExp}
          style={
            Error && DateExp.length == 0 ? styles.error_input : styles.input
          }
          onChangeText={(text) => setDateExp(text)}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialCommunityIcons
          style={styles.iconInput}
          name="numeric"
          size={30}
          color="#a4a4a4"
        />

        <TextInput
          placeholder="CVV"
          placeholderTextColor="#737373"
          value={CVV}
          style={Error && CVV.length == 0 ? styles.error_input : styles.input}
          onChangeText={(text) => setCVV(text)}
        />
      </View>
      {
        props.Loading ? <ActivityIndicator size="large" /> :
          <TouchableOpacity onPress={() => Valider()} style={styles.button}>
            <Text style={styles.btnText}>Valider</Text>
          </TouchableOpacity>
      }
    </ScrollView>
  );
}

export default PaiementCB;
const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingBottom: 100,
  },
  montant: {
    borderBottomWidth: 1,
    borderColor: "#bdbdbd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 65,
    marginBottom: 20,
  },
  montantvalue: {
    fontSize: 22,
    width: "50%",
    fontWeight: "800",
    color: "red",
    textAlign: "center",
  },
  montanttext: {
    fontSize: 20,
    width: "50%",
    fontWeight: "500",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
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
  iconInput: {
    position: "absolute",
    left: 10,
    transform: [{ translateY: 10 }],
    zIndex: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  inputView: {
    alignItems: "center",
    maxWidth: 300,
    width: "80%",
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal: "auto",
    height: 50,

    textAlign: "center",
    width: "100%",

    borderBottomWidth: 2,
    borderColor: "#233460",
  },
  button: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    backgroundColor: "#233460",
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "#fff",
    width: 200,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    marginLeft: 10,
  },
  error_input: {
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal: "auto",
    height: 50,

    textAlign: "center",
    width: "100%",

    borderBottomWidth: 3,
    borderColor: "#ff5a4e",
  },
});
