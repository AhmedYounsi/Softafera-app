import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import Text_ from "./Text_";
import { MaterialIcons } from '@expo/vector-icons';

function Dropdown(props) {
  const TickIcon = (Filter) => {
    return (
      props.Filter == Filter && (

        <MaterialIcons
          style={{ position: "absolute", right: 8 }}
          name="check" size={28} color="grey" />
      )
    );
  };

  return (
    <>
      {props.DropdonwActive && (
        <View style={styles.items}>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Tous")}
            style={styles.singleItem}
          >
            <Text_ text={"Tous"} style={{ fontSize: 16 }} />
            {TickIcon("Tous")}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Aujourd'hui")}
            style={styles.singleItem}
          >
            <Text_ text={"Aujourd'hui"} style={{ fontSize: 16 }} />
            {TickIcon("Aujourd'hui")}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Hier")}
            style={styles.singleItem}
          >
            <Text_ text={"Hier"} style={{ fontSize: 16 }} />
            {TickIcon("Hier")}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Cette semaine")}
            style={styles.singleItem}
          >
            <Text_ text={"Cette semaine"} style={{ fontSize: 16 }} />
            {TickIcon("Cette semaine")}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Mois en cours")}
            style={styles.singleItem}
          >
            <Text_ text={"Mois en cours"} style={{ fontSize: 16 }} />
            {TickIcon("Mois en cours")}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.FiltrerHist("Année en cours")}
            style={styles.singleItem}
          >
            <Text_ text={"Année en cours"} style={{ fontSize: 16 }} />
            {TickIcon("Année en cours")}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default Dropdown;

const styles = StyleSheet.create({
  Dropdonw: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  items: {
    backgroundColor: "#f2f2f2",
    width: "50%",
    height: "100%",
    position: "absolute",
    height: "auto",
    zIndex: 1000,
    top: 40,
    left: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#e0e0e0",
  },
  singleItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 5,
  },
});
