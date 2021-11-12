import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Text_ from "../../components/Text_";

function PaiementMail(props) {
  const [Email, setEmail] = useState("");
  const MontantReducers = useSelector((state) => state.MontantReducers);
  const [Error, setError] = useState(false);
  const [MessageError, setMessageError] = useState("")

  useEffect(() => {
    setError(false);
  }, [Email]);

  const Valider = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Email.length == 0) {
      setError(true);
      setMessageError("Champ vide !")
      return
    }
    // if (!reg.test(Email)) {
    //   setMessageError("Email invalide !")
    //   setError(true);
    //   return
    // }
    props.Payer({ type: 2, montant: MontantReducers, email: Email.toLowerCase() })

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
          source={require("../../assets/mail-icon.png")}
        />
      </View>
      {Error && <ErrorMessage errorText={MessageError} />}
      <TextInput
        placeholder="Entrer mail"
        placeholderTextColor="#737373"
        value={Email}
        style={Error ? styles.error_input : styles.input}
        onChangeText={(text) => setEmail(text)}
      />
      {
        props.Loading ? <ActivityIndicator size="large" /> :
          <TouchableOpacity onPress={() => Valider()} style={styles.button}>
            <Text style={styles.btnText}>Valider</Text>
          </TouchableOpacity>
      }
    </ScrollView>
  );
}

export default PaiementMail;
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
  icon: {
    width: 100,
    height: 100,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 20,
    marginHorizontal: "auto",
    height: 40,
    width: "80%",
    textAlign: "center",
    maxWidth: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  button: {
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
