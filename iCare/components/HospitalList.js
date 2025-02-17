// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   Image
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function HospitalList() {
//   const navigation = useNavigation();
//   const hospitals = [
//     {
//       type: "소아청소년과",
//       name: "메디아이소아청소년과",
//       status: "영업 중",
//       hours: "11:00 ~ 21:00",
//       distance: "1km",
//       address: "서울 노원구 상계로10길 7",
//       tel: "02-1234-5678"
//     },
//     {
//       type: "내과",
//       name: "속편한내과",
//       status: "영업 중",
//       hours: "11:00 ~ 21:00",
//       distance: "1km",
//       address: "서울 노원구 상계로10길 9",
//       tel: "02-1234-5678"
//     },
//     {
//       type: "안과",
//       name: "누네안과의원",
//       status: "영업 중",
//       hours: "11:00 ~ 21:00",
//       distance: "1km",
//       address: "서울 노원구 노해로65길 14-3",
//       tel: "02-1234-5678"
//     }
//   ];

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <MaterialIcons name="chevron-left" size={32} color="#CCCCCC" />
//           </TouchableOpacity>
//           <Image
//             source={require("../assets/HeaderGreenLogo.png")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.subHeader}>
//           <View style={styles.titleContainer}>
//             <MaterialIcons name="local-hospital" size={24} color="#016A4C" />
//             <Text style={styles.pageTitle}>병원찾기</Text>
//           </View>
//           <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterText}>가까운 순</Text>
//             <MaterialIcons
//               name="keyboard-arrow-down"
//               size={24}
//               color="#666666"
//             />
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.listContainer}>
//           {hospitals.map((hospital, index) => (
//             <TouchableOpacity key={index} style={styles.hospitalItem}>
//               <View style={styles.typeLabel}>
//                 <Text style={styles.typeText}>{hospital.type}</Text>
//               </View>
//               <Text style={styles.hospitalName}>{hospital.name}</Text>
//               <Text style={styles.statusText}>
//                 <Text
//                   style={
//                     hospital.status === "영업 중"
//                       ? styles.openStatus
//                       : styles.closedStatus
//                   }
//                 >
//                   {hospital.status}
//                 </Text>
//                 <Text style={styles.statusDivider}> | </Text>
//                 {hospital.hours}
//                 <Text style={styles.statusDivider}> | </Text>
//                 {hospital.distance}
//               </Text>
//               <View style={styles.addressContainer}>
//                 <MaterialIcons name="location-on" size={16} color="#666" />
//                 <Text style={styles.addressText}>주소: {hospital.address}</Text>
//               </View>
//               <View style={styles.telContainer}>
//                 <MaterialIcons name="phone" size={16} color="#666" />
//                 <Text style={styles.telText}>전화: {hospital.tel}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

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

export default function HospitalList() {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 엔드포인트 (백엔드 Django API 주소)
    fetch("http://172.16.217.175:8000/hospital/hospital-info/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
      })
      .then((data) => {
        // API가 반환하는 데이터는 아래와 같은 형태로 가정합니다:
        // {
        //     "주소": "경기도 수원시 팔달구 중부대로 93, (지동)",
        //     "병원명": "가톨릭대학교 성빈센트병원",
        //     "병원분류": "상급종합",
        //     "거리": "1.2km"
        // }
        // 프론트엔드 UI에서 사용하는 key로 변환합니다.
        const transformedData = data.map((item) => ({
          type: item["병원분류"],
          name: item["병원명"],
          // API에 '영업 상태', '영업 시간', '전화' 정보가 없다면 기본값 처리
          status: "정보없음",
          hours: "정보없음",
          distance: item["거리"],
          address: item["주소"],
          tel: "정보없음"
        }));
        setHospitals(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
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
        <Text style={styles.errorText}>Error: {error.message}</Text>
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
            <MaterialIcons name="local-hospital" size={24} color="#016A4C" />
            <Text style={styles.pageTitle}>병원찾기</Text>
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

        {/* 병원 목록 */}
        <ScrollView style={styles.listContainer}>
          {hospitals.map((hospital, index) => (
            <TouchableOpacity key={index} style={styles.hospitalItem}>
              <View style={styles.typeLabel}>
                <Text style={styles.typeText}>{hospital.type}</Text>
              </View>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
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
  }
});
