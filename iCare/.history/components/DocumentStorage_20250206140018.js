import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DocumentStorage() {
  const navigation = useNavigation();
  const totalDocuments = 0; // 문서 개수를 관리할 상태 추가

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" size={32} color="#CCCCCC" />
          </TouchableOpacity>
          <Image
            source={require("../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.subHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>서류보관함</Text>
            <Text style={styles.documentCount}>(총 {totalDocuments}개)</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>최신순</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="description" size={80} color="#CCCCCC" />
            </View>
            <Text style={styles.emptyText}>
              약국봉투를 등록하고{"\n"}
              처방전을 관리해보세요
            </Text>
            <Text style={styles.subText}>채팅으로도 등록할 수 있습니다.</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                console.log("버튼 클릭됨"); // 디버깅용
                navigation.navigate("RegisterPrescription");
              }}
            >
              <MaterialIcons
                name="medication"
                size={24}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.addButtonText}>약국봉투 등록하기</Text>
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
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  backButton: {
    padding: 4,
    position: "absolute",
    left: 20,
    zIndex: 1
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto"
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222"
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#016A4C",
    marginRight: 8
  },
  documentCount: {
    fontSize: 14,
    color: "#666"
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb"
  },
  emptyContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  emptyText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 12,
    fontWeight: "600"
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 40
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%"
  },
  buttonIcon: {
    marginRight: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});
