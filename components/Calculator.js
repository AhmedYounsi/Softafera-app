import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Text_ from "./Text_";

function Calculator(props) {
  return (
    <View style={styles.numbers}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.numbers(1)}
          style={styles.btn_num}
        >
         <Text_ text={"1"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(2)}
          style={styles.btn_num}
        >
          <Text_ text={"2"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(3)}
          style={styles.btn_num}
        >
          <Text_ text={"3"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers("+")}
          style={[styles.btn_num,{backgroundColor:'#227fc0'}]}
        >
           <Text_ text={"+"} style={{fontSize:20,color:'white'}}  />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.numbers(4)}
          style={styles.btn_num}
        >
          <Text_ text={"4"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(5)}
          style={styles.btn_num}
        >
           <Text_ text={"5"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(6)}
          style={styles.btn_num}
        >
         <Text_ text={"6"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers("/")}
          style={[styles.btn_num,{backgroundColor:'#227fc0'}]}
        >
           <Text_ text={"/"}  style={{fontSize:20,color:'white'}}  />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.numbers(7)}
          style={[styles.btn_num]}
        >
           <Text_ text={"7"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(8)}
          style={styles.btn_num}
        >
           <Text_ text={"8"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(9)}
          style={styles.btn_num}
        >
          <Text_ text={"9"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers("-")}
          style={[styles.btn_num,{backgroundColor:'#227fc0'}]}
        >
          <Text_ text={"-"}  style={{fontSize:20,color:'white'}}  />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.numbers(".")}
          style={[styles.btn_num]}
        >
           <Text_ text={"."} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers(0)}
          style={styles.btn_num}
        >
           <Text_ text={"0"} style={{fontSize:20}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.clear()} style={[styles.btn_num,{backgroundColor:'#bd0000'}]}>
        <Text_ text={"C"} style={{fontSize:20,color:'white'}}  />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.numbers("*")}
          style={[styles.btn_num,{backgroundColor:'#227fc0'}]}
        >
         <Text_ text={"*"}  style={{fontSize:20,color:'white'}}  />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.evaluate()}
          style={styles.btn_num_}
        >
           <Text_ text={`= ${props.Somme} DT`} style={{fontSize:20}}  />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Calculator;

const styles = StyleSheet.create({
  num: {
    fontWeight: "800",
    color: "#5f5f5f",
    fontSize: 17,
  },
  numbers: {
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
    backgroundColor: "#c7c7c7",
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
    backgroundColor: "#c7c7c7",
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
});
