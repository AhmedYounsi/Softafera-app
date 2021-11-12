import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text_ from "./Text_";

function HistoriqueItem(props) {


  const PaiementType = (type) => {
    switch (type) {
      case 1:
        return "SMS"
      case 2:
        return "Email"
      case 3:
        return "Carte bancaire"
      default:
        break;
    }
  }
  const ReturnDate = () => {
    var date = new Date(props.Transaction.date_transaction);
    // console.log(new Date().getTime())
    // date.setDate(date.getDate() - 1);
    // console.log(date)
    return props.Transaction.date_transaction
  }
  return (
    <>
      {/* ------------------------------------- */}

      {/* ------------------------------------- */}
      <View style={styles.paiement}>

        <View style={styles.row_1}>
          <View style={styles.row_1_1}>
            <Text_
              text={props.Transaction.paiement_effectuer ? "Payée" : "Non Payée"}
              style={{
                marginRight: 5,
                fontSize: 17,
                fontWeight: "500",
                color: props.Transaction.paiement_effectuer ? "green" : "red",
              }}
            />


          </View>
          <View style={styles.row_1_2}>
            <Text_ text={'Motif : ' + props.Transaction.motif} style={{ fontWeight: "600", fontSize: 14 }} />
          </View>
        </View>
        <View style={styles.row_2}>
          <FontAwesome
            style={styles.icons}
            name="calendar"
            size={24}
            color="#233460"
          />
          <Text style={{ fontWeight: "600", marginRight: 5 }}>
            Date de transaction :{" "}
          </Text>
          <Text> {ReturnDate()} </Text>
        </View>
        <View style={styles.row_2}>
          <MaterialIcons
            style={styles.icons}
            name="transform"
            size={24}
            color="#233460"
          />
          <Text style={{ fontWeight: "600", marginRight: 5 }}>
            Transaction :{" "}
          </Text>
          <Text> {props.Transaction.refrence_transaction} </Text>
        </View>

        <View style={styles.row_2}>
          <MaterialCommunityIcons name="format-list-bulleted-type" style={styles.icons} size={24} color="#233460" />

          <Text style={{ fontWeight: "600", marginRight: 5 }}>Type de paiement : </Text>
          <Text>
            {
              PaiementType(props.Transaction.type_paiement)
            }
          </Text>
        </View>
        {
          props.Transaction.type_paiement == 2 &&
          <View style={styles.row_2}>
            <Entypo style={styles.icons} name="mail" size={24} color="#233460" />
            <Text style={{ fontWeight: "600", marginRight: 5 }}>E-mail : </Text>
            <Text> {props.Transaction.email} </Text>
          </View>
        }
        {
          props.Transaction.type_paiement == 1 &&
          <View style={styles.row_2}>
            <FontAwesome name="phone" style={styles.icons} size={24} color="#233460" />
            <Text style={{ fontWeight: "600", marginRight: 5 }}>Téléphone : </Text>
            <Text> {props.Transaction.telephone} </Text>
          </View>
        }
        {/* {
          props.Transaction.type_paiement == 3 &&
          <View style={styles.row_2}>
            <Entypo
              style={styles.icons}
              name="credit-card"
              size={30}
              color="#a4a4a4"
            />    <Text style={{ fontWeight: "600", marginRight: 5 }}>CB : </Text>
            <Text> **** </Text>
          </View>
        } */}

      </View>
    </>
  );
}

export default HistoriqueItem;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: 30,

    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
  },
  item2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "33.3333%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
    fontWeight: "800",
  },
  item: {
    width: "33.3333%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
  },
  paiement: {
    width: "100%",
    marginVertical: 10,
    width: "95%",
    maxWidth: 600,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#b1b1b1",
  },
  row_1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  icons: {
    paddingLeft: 15,
    marginRight: 10,
  },
  row_2: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    width: "100%",
  },
  row_1_1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "50%",
    paddingLeft: 15,
  },
  row_1_2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "50%",
    paddingRight: 15,
  },
});
