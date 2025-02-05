import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/iCareLogo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
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