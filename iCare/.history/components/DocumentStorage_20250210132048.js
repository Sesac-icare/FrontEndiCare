import React, { useState } from "react";
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

export default function DocumentStorage() {
  const navigation = useNavigation();
  const [prescriptions, setPrescriptions] = useState([
    {
      childName: "최지수",
      date: "2024.02.15",
      pharmacyName: "행복약국",
      documentId: "202402101"
    },
    {
      childName: "최지유",
      date: "2024.02.15",
      pharmacyName: "건강약국",
      documentId: "202402101"
    },
    {
      childName: "최지인",
      date: "2024.02.15",
      pharmacyName: "행복약국",
      documentId: "202402101"
    }
  ]);

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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>서류 보관함</Text>
          <Text style={styles.count}>(총 {prescriptions.length}개)</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>최신순</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => navigation.navigate("RegisterPrescription")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.registerButtonText}>약국봉투 입력하기</Text>
        </TouchableOpacity>

        <ScrollView style={styles.content}>
          {prescriptions.map((prescription, index) => (
            <TouchableOpacity key={index} style={styles.prescriptionItem}>
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
                style={styles.chevronIcon} 
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
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
    padding: 4
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222"
  },
  count: {
    fontSize: 20,
    color: "#666",
    marginLeft: 8
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto"
  },
  sortText: {
    fontSize: 14,
    color: "#666"
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    margin: 20,
    padding: 16,
    borderRadius: 12
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  prescriptionItem: {
    backgroundColor: "#fff",
    padding: 20,
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
  nameTag: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12
  },
  childName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#016A4C"
  },
  date: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#016A4C",
    marginBottom: 6
  },
  documentId: {
    fontSize: 14,
    color: "#666"
  },
  chevronIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    marginTop: -12
  }
});
