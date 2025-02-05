import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/iCareLogo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>iCare</Text>
          <Text style={styles.subtitle}>
            아이를 위한 24시간 병원 및 약국 찾기
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#016a4c"
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50 // 상하 여백 추가
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150
  },
  textContainer: {
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
