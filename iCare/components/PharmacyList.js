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
  Alert,
  Linking
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getApiUrl, ENDPOINTS } from '../config/api';

export default function PharmacyList() {
  const navigation = useNavigation();
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("nearby"); // 'nearby' or 'open'
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPharmacies();
  }, [filterType]);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);
      const userToken = await AsyncStorage.getItem("userToken");

      if (!userToken) {
        Alert.alert("오류", "로그인이 필요한 서비스입니다.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
        return;
      }

      const endpoint = filterType === "open" ? "open" : "nearby";
      const response = await axios.get(
        getApiUrl(ENDPOINTS.pharmacyList(endpoint)),
        {
          headers: {
            Authorization: `Token ${userToken}`
          },
          timeout: 10000 // 10초 타임아웃 설정
        }
      );

      const transformedData = response.data.map((item) => ({
        name: item["약국명"],
        status: item["영업 상태"],
        hours: item["영업 시간"],
        distance: item["거리"],
        address: item["주소"],
        tel: item["전화"]
      }));

      setPharmacies(transformedData);
    } catch (error) {
      console.error("약국 목록 가져오기 실패:", error);

      if (error.code === "ECONNABORTED") {
        setError("서버 응답 시간이 초과되었습니다.");
        Alert.alert(
          "연결 실패",
          "서버 응답이 지연되고 있습니다.\n잠시 후 다시 시도해주세요."
        );
      } else if (error.response?.status === 401) {
        Alert.alert("오류", "로그인이 필요한 서비스입니다.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
      } else if (error.response?.status === 400) {
        setError("위치 정보를 확인할 수 없습니다.");
        Alert.alert(
          "위치 확인 실패",
          "위치 정보를 확인할 수 없습니다.\n위치 서비스를 켜고 다시 시도해주세요."
        );
      } else {
        setError("약국 정보를 불러올 수 없습니다.");
        Alert.alert(
          "데이터 로드 실패",
          "약국 정보를 불러오는데 실패했습니다.\n네트워크 연결을 확인하고 다시 시도해주세요."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = () => {
    setFilterType((prev) => (prev === "nearby" ? "open" : "nearby"));
  };

  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("알림", "전화번호 정보가 없습니다.");
      return;
    }

    const tel = phoneNumber.replace(/[^0-9]/g, '');
    
    Linking.canOpenURL(`tel:${tel}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert("알림", "전화걸기가 지원되지 않는 기기입니다.");
        } else {
          return Linking.openURL(`tel:${tel}`);
        }
      })
      .catch((err) => {
        Alert.alert("오류", "전화 연결 중 문제가 발생했습니다.");
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#016A4C" />
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

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#016A4C" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={48} color="#E53935" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchPharmacies}
            >
              <Text style={styles.retryButtonText}>다시 시도</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            {pharmacies.map((pharmacy, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.pharmacyItem}
                onPress={() => handleCall(pharmacy.tel)}
              >
                <View style={styles.typeLabel}>
                  <Text style={styles.typeText}>약국</Text>
                </View>
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                <Text style={styles.statusText}>
                  <Text style={pharmacy.status === "영업중" ? styles.openStatus : styles.closedStatus}>
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
        )}
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
  pharmacyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222222",
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
    fontSize: 14,
    flex: 1
  },
  telText: {
    color: "#666",
    fontSize: 14,
    flex: 1
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9fafb"
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 24
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#016A4C",
    borderRadius: 8
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  phoneLink: {
    color: '#016A4C',
    textDecorationLine: 'underline',
  }
});
