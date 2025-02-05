import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PharmacyList() {
  const navigation = useNavigation();
  const pharmacies = [
    {
      name: "참말로 친절한 약국",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울시 영등포구 경인로 841",
      tel: "02-1234-5678"
    },
    {
      name: "바른약국",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울 도봉구 도봉로 511 1층",
      tel: "02-1234-5678"
    },
    {
      name: "아이약국",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울 도봉구 도봉로 461 우림빌딩 1층",
      tel: "02-1234-5678"
    }
  ];

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
          <Text style={styles.pageTitle}>약국찾기</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>가까운 순</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer}>
          {pharmacies.map((pharmacy, index) => (
            <TouchableOpacity key={index} style={styles.pharmacyItem}>
              <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              <Text style={styles.statusText}>
                {pharmacy.status} | {pharmacy.hours} | {pharmacy.distance}
              </Text>
              <View style={styles.addressContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.addressText}>주소: {pharmacy.address}</Text>
              </View>
              <View style={styles.telContainer}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.telText}>전화: {pharmacy.tel}</Text>
              </View>
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
    backgroundColor: "#fff",
    position: "relative"
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
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
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
  listContainer: {
    flex: 1,
    padding: 20
  },
  pharmacyItem: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  statusText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 14
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8
  },
  telContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  addressText: {
    color: "#666",
    fontSize: 14
  },
  telText: {
    color: "#666",
    fontSize: 14
  }
}); 