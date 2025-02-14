import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PharmacyList() {
  const navigation = useNavigation();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        // API URL (자신의 백엔드 주소로 변경)
        const response = await fetch("http://172.16.220.253:8000/pharmacy/pharmacies/");
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();

        // API가 반환하는 데이터는 한글 key로 되어 있습니다.
        // 예: {"약국명": "참말로 친절한 약국", "영업 상태": "영업 중", "영업 시간": "11:00 ~ 21:00", "거리": "1km", "주소": "서울시 영등포구 경인로 841", "전화": "02-1234-5678"}
        // 내부에서 UI 렌더링에 맞게 변환합니다.
        const transformedData = data.map(item => ({
          name: item["약국명"],
          status: item["영업 상태"],
          hours: item["영업 시간"],
          distance: item["거리"],
          address: item["주소"],
          tel: item["전화"]
        }));

        setPharmacies(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#016A4C" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 헤더 영역 */}
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

        {/* 서브 헤더 영역 */}
        <View style={styles.subHeader}>
          <View style={styles.titleContainer}>
            <MaterialIcons name="location-on" size={24} color="#016A4C" />
            <Text style={styles.pageTitle}>약국찾기</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>가까운 순</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        {/* 약국 목록 */}
        <ScrollView style={styles.listContainer}>
          {pharmacies.map((pharmacy, index) => (
            <TouchableOpacity key={index} style={styles.pharmacyItem}>
              <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              <Text style={styles.statusText}>
                <Text
                  style={
                    pharmacy.status === "영업 중"
                      ? styles.openStatus
                      : styles.closedStatus
                  }
                >
                  {pharmacy.status}
                </Text>
                <Text style={styles.statusDivider}> | </Text>
                {pharmacy.hours}
                <Text style={styles.statusDivider}> | </Text>
                {pharmacy.distance}
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
  pharmacyItem: {
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
  pharmacyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
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
    fontSize: 14
  },
  telText: {
    color: "#666",
    fontSize: 14
  },
  openStatus: {
    color: "#016A4C",
    fontWeight: "700"
  },
  closedStatus: {
    color: "#E53935",
    fontWeight: "700"
  },
  statusDivider: {
    color: "#CCCCCC"
  }
});
