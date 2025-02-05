import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>내 자녀 정보 찾기</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>서류 보관함</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>로그아웃</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>회원탈퇴</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  logo: {
    width: 48,
    height: 48
  },
  content: {
    flex: 1,
    paddingTop: 20
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  menuText: {
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "500"
  },
  divider: {
    height: 12,
    backgroundColor: "#f5f5f5"
  }
}); 