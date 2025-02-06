import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DocumentStorage({ route }) {
  const navigation = useNavigation();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // route.params로 전달된 새 처방전이 있으면 목록에 추가
    if (route.params?.newPrescription) {
      setPrescriptions((prev) => [route.params.newPrescription, ...prev]);
    }
  }, [route.params?.newPrescription]);

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
            <Text style={styles.documentCount}>
              (총 {prescriptions.length}개)
            </Text>
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

        <ScrollView style={styles.content}>
          {prescriptions.map((prescription) => (
            <TouchableOpacity
              key={prescription.documentId}
              style={styles.prescriptionItem}
              onPress={() => {
                /* 상세보기 처리 */
              }}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.childName}>{prescription.childName}</Text>
                <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
              </View>
              <Text style={styles.date}>{prescription.date}</Text>
              <Text style={styles.pharmacyName}>{prescription.pharmacyName}</Text>
              <Text style={styles.documentId}>
                교부번호: {prescription.documentId}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  },
  prescriptionItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12
  },
  date: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#016A4C',
    marginBottom: 4
  },
  documentId: {
    fontSize: 14,
    color: '#666'
  }
});
