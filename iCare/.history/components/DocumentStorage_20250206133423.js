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
            <MaterialIcons name="chevron-left" size={32} color="#222" />
          </TouchableOpacity>
          <Image
            source={require("../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.subHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>서류 보관함</Text>
            <Text style={styles.documentCount}>(총 {totalDocuments}개)</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>최신순</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>아직 등록된</Text>
            <Text style={styles.emptyTitle}>서류가 없어요.</Text>
            <Text style={styles.emptySubtitle}>채팅을 통해 서류를 등록해 주세요!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="local-hospital" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.addButtonText}>약국봉투 입력하기</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  backButton: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginRight: 8
  },
  documentCount: {
    fontSize: 14,
    color: "#666"
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainer: {
    alignItems: "center"
  },
  emptyTitle: {
    fontSize: 24,
    color: "#666",
    lineHeight: 36
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#999",
    marginTop: 12
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    margin: 20,
    padding: 16,
    borderRadius: 12
  },
  buttonIcon: {
    marginRight: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
