import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HistoriqueItem from "../../components/HistoriqueItem";
import { FontAwesome } from "@expo/vector-icons";
import Dropdown from "../../components/Dropdown";
import Text_ from "../../components/Text_";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import URL from '../../Api/Url'
function Historique() {

  const ProfileReducer = useSelector((state) => state.ProfileReducer);

  const [DropdonwActive, setDropdonwActive] = useState(false);
  const [Filter, setFilter] = useState("Tous")
  const [Transaction, setTransaction] = useState([])
  const [DataFiltred, setDataFiltred] = useState([])

  const Get_Transactions = async () => {
    try {
      const res = await axios.get(`${URL}/V0/GET_Transaction`,
        { params: { id_profile: ProfileReducer.id } }
      )
      setTransaction(res.data)
      setDataFiltred(res.data)
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  const RefreshData = () => {
    setTransaction([])
    Get_Transactions()
    setFilter("Tous")
  }


  useFocusEffect(
    useCallback(() => {
      var s = new Date(new Date().getTime()).toLocaleDateString("en-US")
      // console.log(s)
      Get_Transactions()
    }, [])
  );


  const Arrow = () => {
    return (
      <MaterialIcons
        style={{ position: "absolute", right: 5 }}
        name={!DropdonwActive ? "keyboard-arrow-down" : "keyboard-arrow-up"}
        size={35} color="grey" />
    );
  };

  const FiltrerHist = (data) => {
    setFilter(data)
    setDropdonwActive(false)
  }

  useEffect(() => {
    let arr = []
    const today = new Date()
    const hier = new Date()
    const week = new Date()
    today.setDate(hier.getDate())
    today.setHours(0, 0, 0, 0);
    hier.setDate(hier.getDate() - 1)
    week.setDate(hier.getDate() - 7)
    week.setHours(0, 0, 0, 0);


    if (Filter == "Cette semaine") {
      arr = Transaction.filter(el => {
        var date = new Date(el.date_transaction);
        date.setDate(date.getDate());
        date.setHours(0, 0, 0, 0);
        return (
          date - week > 0
          // date.getDate() - week.getDate() <= 8 && date.getDate() - week.getDate() > 0
        )
      }
      )

    }


    if (Filter == 'Hier') {
      arr = Transaction.filter(el => {
        var date = new Date(el.date_transaction);
        date.setDate(date.getDate());
        return (
          date.getDate() == hier.getDate() && date.getMonth() == hier.getMonth() &&
          date.getFullYear() == hier.getFullYear()
        )
      }
      )

    }

    if (Filter == 'Mois en cours') {
      arr = Transaction.filter(el => {
        var date = new Date(el.date_transaction);
        date.setDate(date.getDate());
        return (
          date.getMonth() == today.getMonth() &&
          date.getFullYear() == today.getFullYear()
        )
      }
      )

    }

    if (Filter == 'Année en cours') {
      arr = Transaction.filter(el => {
        var date = new Date(el.date_transaction);
        date.setDate(date.getDate());
        return (
          date.getFullYear() == today.getFullYear()
        )
      }
      )

    }

    if (Filter == "Aujourd'hui") {
      arr = Transaction.filter(el => {
        var date = new Date(el.date_transaction);
        date.setDate(date.getDate());
        date.setHours(0, 0, 0, 0);

        return (
          date.getDate() == today.getDate() &&
          date.getMonth() == today.getMonth() &&
          date.getFullYear() == today.getFullYear()
        )

      }
      )

    }

    if (Filter == "Tous") {
      setDataFiltred(Transaction)
      return
    }

    setDataFiltred(arr)

  }, [Filter])


  const TriData = () => {
    let arr = DataFiltred.sort((a, b) => (a.date_transaction < b.date_transaction) ? 1 : ((b.date_transaction < a.date_transaction) ? -1 : 0))

    return arr
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        DropdonwActive &&
        <TouchableOpacity onPress={() => setDropdonwActive(false)} style={styles.modal}></TouchableOpacity>
      }
      <Dropdown Filter={Filter} FiltrerHist={(data) => FiltrerHist(data)} DropdonwActive={DropdonwActive} />
      <View style={styles.menu}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => setDropdonwActive(!DropdonwActive)}
            style={styles.filreDay}
          >
            <Text_ text={Filter} style={{ fontSize: 14 }} />
            <Arrow />
          </TouchableOpacity>
        </View>
        <View style={styles.item2}>
          <Text_ text={"Transaction : "} style={{ fontSize: 15 }} />
          <Text_ text={DataFiltred?.length} style={{ fontSize: 15 }} />
        </View>

        <TouchableOpacity onPress={() => RefreshData()} style={styles.item3}>
          <FontAwesome name="refresh" size={17} color="#233460" />
        </TouchableOpacity>
      </View>

      {
        TriData().map((el, index) =>
          <HistoriqueItem
            key={index}
            paiement={true} Transaction={el} />

        )
      }
    </ScrollView>
  );
}

export default Historique;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  modal: {
    height: "100%",
    width: "100%",
    backgroundColor: '#00000063',
    position: 'absolute', top: 40, left: 0, zIndex: 100
  },
  menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: 40,

    borderBottomWidth: 1,
    borderColor: "#bfbfbf",
  },
  filreDay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
    fontWeight: "800",
  },
  item3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "15%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
    fontWeight: "800",
  },
  item: {
    display: "flex",
    width: "45%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
  },
});
