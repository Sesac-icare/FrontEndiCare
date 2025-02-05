import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/iCare.png")}  // 알약 이미지 파일 필요
          style={styles.logo}
        />
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
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    tintColor: "#ffffff"  // 이미지를 흰색으로 변경
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