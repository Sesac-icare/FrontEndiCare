import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HospitalList() {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("nearby");

  useEffect(() => {
    fetchHospitals();
  }, [filterType]);

  const fetchHospitals = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
        return;
      }

      const endpoint = filterType === "open" ? "open" : "nearby";
      const response = await axios.get(
        `http://172.16.217.175:8000/hospital/${endpoint}/`,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.results) {
        setHospitals(response.data.results);
      }
    } catch (error) {
      console.error("병원 목록 가져오기 실패:", error);
      Alert.alert("오류", "병원 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = () => {
    setFilterType((prev) => (prev === "nearby" ? "open" : "nearby"));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#016A4C" />
        </View>
      </SafeAreaView>
    );
  }

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
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
            <Text style={styles.filterText}>
              {filterType === "nearby" ? "가까운 순" : "영업중"}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer}>
          {hospitals.map((hospital) => (
            <TouchableOpacity key={hospital.id} style={styles.hospitalItem}>
              <View style={styles.typeLabel}>
                <Text style={styles.typeText}>{hospital.hospital_type}</Text>
              </View>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.statusText}>
                <Text
                  style={
                    hospital.state === "영업중"
                      ? styles.openStatus
                      : styles.closedStatus
                  }
                >
                  {hospital.state}
                </Text>
                <Text style={styles.statusDivider}> | </Text>
                {hospital.weekday_hours?.mon?.start} ~{" "}
                {hospital.weekday_hours?.mon?.end}
                <Text style={styles.statusDivider}> | </Text>
                {hospital.distance.toFixed(1)}km
              </Text>
              <View style={styles.addressContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.addressText}>주소: {hospital.address}</Text>
              </View>
              <View style={styles.telContainer}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={styles.telText}>전화: {hospital.phone}</Text>
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
    backgroundColor: "#f9fafb"
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
    flexDirection: "row",
    alignItems: "center",
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
    padding: 16,
    backgroundColor: "#f9fafb"
  },
  hospitalItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  typeLabel: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 4,
    paddingHorizontal: 12,
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
    color: "#222222",
    marginBottom: 8
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
