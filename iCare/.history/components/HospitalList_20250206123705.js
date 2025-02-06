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

export default function HospitalList() {
  const navigation = useNavigation();
  const hospitals = [
    {
      type: "소아청소년과",
      name: "메디아이소아청소년과",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울 노원구 상계로10길 7",
      tel: "02-1234-5678"
    },
    {
      type: "내과",
      name: "속편한내과",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울 노원구 상계로10길 9",
      tel: "02-1234-5678"
    },
    {
      type: "안과",
      name: "누네안과의원",
      status: "영업 중",
      hours: "11:00 ~ 21:00",
      distance: "1km",
      address: "서울 노원구 노해로65길 14-3",
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
          <View style={styles.titleContainer}>
            <MaterialIcons name="local-hospital" size={24} color="#016A4C" />
            <Text style={styles.pageTitle}>병원찾기</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>필터</Text>
            <MaterialIcons name="tune" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer}>
          {hospitals.map((hospital, index) => (
            <TouchableOpacity key={index} style={styles.hospitalItem}>
              <View style={styles.hospitalHeader}>
                <View style={styles.typeLabel}>
                  <Text style={styles.typeText}>{hospital.type}</Text>
                </View>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
              </View>
              <Text style={styles.statusText}>
                <Text
                  style={
                    hospital.status === "영업 중"
                      ? styles.openStatus
                      : styles.closedStatus
                  }
                >
                  {hospital.status}
                </Text>
                <Text style={styles.statusDivider}> | </Text>
                {hospital.hours}
                <Text style={styles.statusDivider}> | </Text>
                {hospital.distance}
              </Text>
              <View style={styles.addressContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.addressText}>주소: {hospital.address}</Text>
              </View>
              <View style={styles.telContainer}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.telText}>전화: {hospital.tel}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#016A4C"
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
    padding: 16
  },
  hospitalItem: {
    marginBottom: 20,
    padding: 16,
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
  hospitalHeader: {
    marginBottom: 12
  },
  typeLabel: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8
  },
  typeText: {
    color: "#016A4C",
    fontSize: 14,
    fontWeight: "600"
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222"
  },
  openStatus: {
    color: "#016A4C",
    fontWeight: "600"
  },
  closedStatus: {
    color: "#E53935",
    fontWeight: "600"
  },
  statusDivider: {
    color: "#CCCCCC"
  },
  statusText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20
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
    fontSize: 14,
    flex: 1
  },
  telText: {
    color: "#666",
    fontSize: 14,
    flex: 1
  }
});
