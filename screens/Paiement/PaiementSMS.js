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
import { FontAwesome5 } from "@expo/vector-icons";
import Text_ from "../../components/Text_";

function PaiementSMS(props) {
  const [Number, setNumber] = useState("");
  const MontantReducers = useSelector((state) => state.MontantReducers);
  const [Error, setError] = useState(false);

  const numbers = (num) => {
    var arr = Number;
    arr = `${arr}${num}`;
    setNumber(arr);
  };

  useEffect(() => {
    setError(false);
  }, [Number]);

  const Valider = () => {
    if (Number.length == 0) {
      setError(true);
      return
    }
    props.Payer({ type: 1, montant: MontantReducers, tel: Number })

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
          source={require("../../assets/sms-icon.png")}
        />
      </View>
      {Error && <ErrorMessage errorText={"numéro invalide"} />}
      <TextInput
        placeholder="saisir votre numéro"
        placeholderTextColor="#737373"
        value={Number}
        style={Error ? styles.error_input : styles.input}
        onChangeText={(text) => setNumber(text)}
        keyboardType='numeric'
        textAlign={'center'}
      />

      <View style={styles.numbers}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => numbers(1)} style={styles.btn_num}>
            <Text_ text={"1"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(2)} style={styles.btn_num}>
            <Text_ text={"2"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(3)} style={styles.btn_num}>
            <Text_ text={"3"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => numbers(4)} style={styles.btn_num}>
            <Text_ text={"4"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(5)} style={styles.btn_num}>
            <Text_ text={"5"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(6)} style={styles.btn_num}>
            <Text_ text={"6"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => numbers(7)} style={styles.btn_num}>
            <Text_ text={"7"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(8)} style={styles.btn_num}>
            <Text_ text={"8"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(9)} style={styles.btn_num}>
            <Text_ text={"9"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => numbers("+")} style={styles.btn_num}>
            <Text_ text={"+"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => numbers(0)} style={styles.btn_num}>
            <Text_ text={"0"} style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNumber("")}
            style={styles.btn_num}
          >
            <FontAwesome5 name="backspace" size={20} color="#bd0000" />
          </TouchableOpacity>
        </View>
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

export default PaiementSMS;
const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 50,
    alignItems: "center",
  },
  num: {
    fontWeight: "800",
    color: "#5f5f5f",
    fontSize: 17,
  },
  numbers: {
    marginBottom: 20,
    width: "80%",
    marginHorizontal: "auto",
    maxWidth: 300,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn_num: {
    backgroundColor: "#cbcbcb",
    fontSize: 20,
    fontWeight: "800",
    margin: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    color: "#7d7d7d",
  },
  btn_num_: {
    backgroundColor: "#cbcbcb",
    fontSize: 20,
    fontWeight: "800",
    margin: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    color: "#7d7d7d",
    width: 235,
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
    backgroundColor: "white",
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
    textAlign: 'center',
    maxWidth: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontWeight: "500",
    fontSize: 20,

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
