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
          <View style={styles.profileSection}>
            <MaterialIcons name="account-circle" size={60} color="#016A4C" />
            <Text style={styles.userName}>사용자님</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.buttonCard}>
              <View style={styles.buttonContent}>
                <MaterialIcons
                  name="child-care"
                  size={48}
                  color="#016A4C"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>내 자녀 정보 찾기</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#CCCCCC"
                  style={styles.arrowIcon}
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
                  size={48}
                  color="#016A4C"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>서류 보관함</Text>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#CCCCCC"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>설정</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>로그아웃</Text>
              <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto"
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb"
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginTop: 12
  },
  buttonGroup: {
    marginBottom: 30
  },
  buttonCard: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30
  },
  buttonIcon: {
    transform: [{ scale: 2 }],
    marginLeft: 0
  },
  buttonText: {
    fontSize: 18,
    color: "#016A4C",
    fontWeight: "900",
    flex: 1,
    textAlign: "center",
    marginLeft: 0
  },
  arrowIcon: {
    transform: [{ scale: 2 }],
    marginLeft: "auto"
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: 'hidden'
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: '#fff'
  },
  lastMenuItem: {
    borderBottomWidth: 0
  },
  menuText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500"
  }
});
