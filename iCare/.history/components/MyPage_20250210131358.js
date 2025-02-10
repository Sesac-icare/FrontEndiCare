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
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleGreen}>마이페이지</Text>
            </View>
            <Text style={styles.subtitle}>
              내 자녀 정보와 서류를 관리할 수 있습니다.
            </Text>
          </View>

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

          <View style={styles.menuSection}>
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
    backgroundColor: "#fff"
  },
  titleWrapper: {
    marginTop: 20,
    marginBottom: 40
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "nowrap",
    alignItems: "center"
  },
  titleGreen: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#016A4C"
  },
  subtitle: {
    fontSize: 16,
    color: "#999999"
  },
  buttonCard: {
    backgroundColor: "#fff",
    paddingVertical: 70,
    width: "100%",
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8
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
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  lastMenuItem: {
    borderBottomWidth: 0
  },
  menuText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500"
  }
});
