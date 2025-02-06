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
import { useNavigation } from "@react-navigation/native";

export default function MyPage() {
  const navigation = useNavigation();

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
          <TouchableOpacity style={styles.buttonCard}>
            <View style={styles.buttonContent}>
              <MaterialIcons
                name="child-care"
                size={24}
                color="#016A4C"
              />
              <Text style={styles.buttonText}>내 자녀 정보 찾기</Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#CCCCCC"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => navigation.navigate("DocumentStorage")}
          >
            <View style={styles.buttonContent}>
              <MaterialIcons
                name="medical-services"
                size={24}
                color="#016A4C"
              />
              <Text style={styles.buttonText}>서류 보관함</Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#CCCCCC"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.menuSection}>
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
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  buttonCard: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  buttonText: {
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "600",
    flex: 1,
    marginLeft: 12
  },
  menuSection: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  menuText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500"
  }
});
