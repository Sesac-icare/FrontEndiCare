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
      hours: "11:00 - 21:00",
      distance: "1km",
      address: "서울 노원구 상계로10길 7",
      tel: "02-1234-5678"
    },
    {
      type: "내과",
      name: "속편내과",
      status: "영업 중",
      hours: "11:00 - 21:00",
      distance: "1km",
      address: "서울 노원구 상계로10길 9",
      tel: "02-1234-5678"
    },
    {
      type: "안과",
      name: "누네안과의원",
      status: "영업 중",
      hours: "11:00 - 21:00",
      distance: "1km",
      address: "서울 노원구 노해로65길 14-3",
      tel: "02-1234-5678"
    }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="chevron-left" size={32} color="#CCCCCC" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>병원찾기</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Image
              source={require("../assets/HeaderGreenLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <ScrollView style={styles.listContainer}>
          {hospitals.map((hospital, index) => (
            <TouchableOpacity key={index} style={styles.hospitalItem}>
              <View style={styles.hospitalHeader}>
                <Text style={styles.hospitalType}>{hospital.type}</Text>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.statusText}>
                  {hospital.status} | {hospital.hours} | {hospital.distance}
                </Text>
                <View style={styles.addressContainer}>
                  <MaterialIcons name="location-on" size={16} color="#666" />
                  <Text style={styles.addressText}>
                    주소: {hospital.address}
                  </Text>
                </View>
                <View style={styles.telContainer}>
                  <MaterialIcons name="phone" size={16} color="#666" />
                  <Text style={styles.telText}>전화: {hospital.tel}</Text>
                </View>
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
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  backButton: {
    marginRight: 8
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  },
  logo: {
    width: 32,
    height: 32
  },
  listContainer: {
    flex: 1,
    padding: 20
  },
  hospitalItem: {
    marginBottom: 20,
    padding: 15,
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
    marginBottom: 10
  },
  hospitalType: {
    color: "#016a4c",
    fontSize: 14,
    marginBottom: 4
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  hospitalInfo: {
    gap: 8
  },
  statusText: {
    color: "#666",
    fontSize: 14
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
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
