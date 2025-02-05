import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        <MaterialIcons name="home" size={24} color="#016a4c" />
        <Text style={styles.footerText}>홈</Text>
      </View>
      <View style={styles.footerItem}>
        <MaterialIcons name="chat" size={24} color="#CCCCCC" />
        <Text style={styles.footerText}>채팅</Text>
      </View>
      <View style={styles.footerItem}>
        <MaterialIcons name="person" size={24} color="#CCCCCC" />
        <Text style={styles.footerText}>마이페이지</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  footerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4
  }
}); 