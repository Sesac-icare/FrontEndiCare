// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   Image
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function PrescriptionDetail({ route }) {
//   const navigation = useNavigation();
//   const { prescription } = route.params;
//   const [medications, setMedications] = useState([
//     {
//       name: "리포직점안겔",
//       dosage: "1개, 1회, 1일",
//       details: "..."
//     },
//     {
//       name: "타이레놀정 500mg",
//       dosage: "2개, 3회, 3일",
//       details: "..."
//     },
//     {
//       name: "판콜에이내복액",
//       dosage: "1개, 2회, 5일",
//       details: "..."
//     }
//   ]);

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
//           <Text style={styles.headerTitle}>조제 약 정보</Text>
//         </View>

//         <ScrollView style={styles.content}>
//           <View style={styles.infoCard}>
//             <View style={styles.nameTag}>
//               <Text style={styles.nameText}>{prescription.childName}</Text>
//             </View>
            
//             <Text style={styles.pharmacyName}>{prescription.pharmacyName}</Text>
//             <Text style={styles.address}>약국 위치: {prescription.address}</Text>
//             <Text style={styles.date}>발행일: {prescription.date}</Text>
//             <Text style={styles.price}>총수납금액 합계: {prescription.price}원</Text>
//           </View>

//           <View style={styles.medicationList}>
//             {medications.map((med, index) => (
//               <View key={index} style={styles.medicationItem}>
//                 <View style={styles.medHeader}>
//                   <Text style={styles.medName}>{med.name}</Text>
//                   <TouchableOpacity 
//                     style={styles.infoButton}
//                     onPress={() => navigation.navigate("MedicationDetail", { medicationName: med.name })}
//                   >
//                     <Text style={styles.infoButtonText}>정보 보기</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <Text style={styles.dosage}>{med.dosage}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PrescriptionDetail({ route }) {
  const navigation = useNavigation();
  const { prescription } = route.params;
  const [medications, setMedications] = useState([
    {
      name: "리포직점안겔",
      dosage: "1개, 1회, 1일",
      details: "..."
    },
    {
      name: "타이레놀정 500mg",
      dosage: "2개, 3회, 3일",
      details: "..."
    },
    {
      name: "판콜에이내복액",
      dosage: "1개, 2회, 5일",
      details: "..."
    }
  ]);

  // 버튼 클릭 시 API 호출 후 MedicationDetail 화면으로 이동하는 함수
  const handleInfoPress = async (medName) => {
    try {
      const apiUrl = "http://172.16.220.253:8000/drug/drug-info/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ drugName: medName })
      });
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }
      const data = await response.json();
      // MedicationDetail 화면으로 약품명과 API 결과 데이터를 함께 전달
      navigation.navigate("MedicationDetail", { medicationName: medName, drugData: data });
    } catch (error) {
      console.error("정보 가져오기 실패:", error);
      // 에러 처리는 필요에 따라 Alert 등을 활용하세요.
    }
  };

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
          <Text style={styles.headerTitle}>조제 약 정보</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.nameTag}>
              <Text style={styles.nameText}>{prescription.childName}</Text>
            </View>
            <Text style={styles.pharmacyName}>{prescription.pharmacyName}</Text>
            <Text style={styles.address}>약국 위치: {prescription.address}</Text>
            <Text style={styles.date}>발행일: {prescription.date}</Text>
            <Text style={styles.price}>총수납금액 합계: {prescription.price}원</Text>
          </View>

          <View style={styles.medicationList}>
            {medications.map((med, index) => (
              <View key={index} style={styles.medicationItem}>
                <View style={styles.medHeader}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <TouchableOpacity 
                    style={styles.infoButton}
                    onPress={() => handleInfoPress(med.name)}
                  >
                    <Text style={styles.infoButtonText}>정보 보기</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.dosage}>{med.dosage}</Text>
              </View>
            ))}
          </View>
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
    padding: 4,
    position: "absolute",
    left: 20,
    zIndex: 1
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    padding: 20
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  nameText: {
    color: "#016A4C",
    fontSize: 14,
    fontWeight: "600"
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  price: {
    fontSize: 14,
    color: "#666"
  },
  medicationList: {
    gap: 12
  },
  medicationItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  medHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  medName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222"
  },
  infoButton: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  infoButtonText: {
    color: "#016A4C",
    fontSize: 12,
    fontWeight: "500"
  },
  dosage: {
    fontSize: 14,
    color: "#666"
  }
}); 