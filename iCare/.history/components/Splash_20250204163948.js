import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialIcons name="medication" size={100} color="#ffffff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>iCare</Text>
        <Text style={styles.subtitle}>
          아이를 위한 24시간 병원 및 약국 찾기
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#016a4c",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center"
  },
  textContainer: {
    marginBottom: 50,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8
  }
});
