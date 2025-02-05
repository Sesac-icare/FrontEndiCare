import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/header-green-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <MaterialIcons name="medical-services" size={32} color="#016a4c" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  logo: {
    width: 32,
    height: 32
  }
});
