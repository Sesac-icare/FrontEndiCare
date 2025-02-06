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
          <Text style={styles.headerTitle}>서류 보관함</Text>
          <Text style={styles.documentCount}>(총 {prescriptions.length}개)</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("RegisterPrescription")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>약국봉투 입력하기</Text>
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          {prescriptions.map((prescription) => (
            <TouchableOpacity
              key={prescription.documentId}
              style={styles.prescriptionItem}
              onPress={() => {/* 이미지 보기 처리 */}}
            >
              <View style={styles.nameTag}>
                <Text style={styles.childName}>{prescription.childName}</Text>
              </View>
              <Text style={styles.date}>{prescription.date}</Text>
              <Text style={styles.pharmacyName}>{prescription.pharmacyName}</Text>
              <Text style={styles.documentId}>교부번호: {prescription.documentId}</Text>
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color="#CCCCCC"
                style={styles.chevron}
              />
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
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f9fafb"
  },
  content: {
    padding: 20
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A4C',
    padding: 16,
    margin: 20,
    borderRadius: 12
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  prescriptionItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative'
  },
  nameTag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  childName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  date: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#016A4C',
    marginBottom: 4
  },
  documentId: {
    fontSize: 14,
    color: '#666'
  },
  chevron: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12
  }
});
