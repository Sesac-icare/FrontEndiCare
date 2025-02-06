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
            <MaterialIcons
              name="medical-services"
              size={24}
              color="#016A4C"
              style={styles.titleIcon}
            />
            <Text style={styles.headerTitle}>서류보관함</Text>
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
            <Text style={styles.subText}>
              채팅을 통한 서류 등록도 가능합니다.
            </Text>
            <TouchableOpacity style={styles.addButton}>
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
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 4,
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
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  titleIcon: {
    marginRight: 8
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#016A4C",
    marginRight: 8
  },
  documentCount: {
    fontSize: 14,
    color: "#666666"
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  filterText: {
    fontSize: 14,
    color: "#666666"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  emptyContainer: {
    alignItems: "center"
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 12
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 30
  },
  addButton: {
    backgroundColor: "#016A4C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
