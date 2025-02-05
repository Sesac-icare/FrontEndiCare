import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/iCareLogo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
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
    justifyContent: "space-between"
  },
  logoContainer: {
    height: height * 0.6,  // 화면 높이의 60%
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150
  },
  footer: {
    height: height * 0.2,  // 화면 높이의 20%
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50
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
