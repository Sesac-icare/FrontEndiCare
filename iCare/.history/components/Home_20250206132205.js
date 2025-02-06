import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PharmacyList")}
        >
          <MaterialIcons name="local-pharmacy" size={24} color="#016A4C" />
          <Text style={styles.buttonText}>약국 찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HospitalList")}
        >
          <MaterialIcons name="local-hospital" size={24} color="#016A4C" />
          <Text style={styles.buttonText}>병원 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "600"
  }
});
