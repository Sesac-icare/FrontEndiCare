// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";

// export default function MedicationDetail({ route }) {
//   const navigation = useNavigation();
//   const { medicationName } = route.params;
//   const [medicationInfo, setMedicationInfo] = useState({
//     name: "아스피린정 100mg",
//     company: "바이엘코리아",
//     description: "아스피린정은 혈전 생성을 억제하여 심근경색이나 뇌 졸중의 예방에 사용되는 약품입니다. 주성분인 아세틸 살리실산이 혈소판 응집을 억제하여 혈전 형성을 방지합니다. 1일 1회 100mg을 복용하며, 식후에 충분한 물과 함께 복용하시기 바랍니다.",
//     warnings: [
//       "위장 장애가 있는 환자는 복용 전 의사와 상담이 필요합니다.",
//       "출혈 경향이 있는 환자는 주의가 필요합니다.",
//       "임산부는 복용 전 반드시 의사와 상담하십시오.",
//       "알레르기 반응이 나타날 수 있으니 즉시 의사와 상담하십시오."
//     ]
//   });

//   // API 연동 준비될 때까지 주석 처리
//   /*
//   useEffect(() => {
//     fetchMedicationInfo();
//   }, []);

//   const fetchMedicationInfo = async () => {
//     try {
//       const response = await axios.get(
//         `http://172.16.217.175:8000/medications/${medicationName}/`
//       );
//       setMedicationInfo(response.data);
//     } catch (error) {
//       console.error("약품 정보 가져오기 실패:", error);
//     }
//   };
//   */

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
//           <Text style={styles.headerTitle}>약품 정보</Text>
//         </View>

//         <ScrollView style={styles.content}>
//           <Text style={styles.medicationName}>
//             {medicationInfo?.name || medicationName}
//           </Text>
//           <Text style={styles.company}>{medicationInfo?.company}</Text>

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>약품 설명</Text>
//             <Text style={styles.description}>
//               {medicationInfo?.description}
//             </Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>보관 방법</Text>
//             <View style={styles.storageList}>
//               <View style={styles.storageItem}>
//                 <MaterialIcons name="thermostat" size={24} color="#222" />
//                 <Text style={styles.storageText}>실온(1-30°C)에서 보관</Text>
//               </View>
//               <View style={styles.storageItem}>
//                 <MaterialIcons name="wb-sunny" size={24} color="#222" />
//                 <Text style={styles.storageText}>습기와 빛을 피해 보관</Text>
//               </View>
//               <View style={styles.storageItem}>
//                 <MaterialIcons name="child-care" size={24} color="#222" />
//                 <Text style={styles.storageText}>
//                   어린이의 손이 닿지 않는 곳에 보관
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>주의사항</Text>
//             <View style={styles.warningList}>
//               {medicationInfo?.warnings?.map((warning, index) => (
//                 <View key={index} style={styles.warningItem}>
//                   <MaterialIcons name="warning" size={20} color="#016A4C" />
//                   <Text style={styles.warningText}>{warning}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MedicationDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicationName } = route.params; // PrescriptionDetail에서 전달한 약품명

  const [drugInfo, setDrugInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Django API의 엔드포인트 URL (DrugSearchAPIView)
    const apiUrl = "http://3.35.228.23:8000/drug/drug-info/";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drugName: medicationName })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API 호출 실패");
        }
        return response.json();
      })
      .then((data) => {
        setDrugInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [medicationName]);

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
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={32} color="#CCCCCC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{medicationName} 정보</Text>
        {drugInfo && drugInfo.length > 0 ? (
          drugInfo.map((item, index) => (
            <View key={index} style={styles.infoCard}>
              <Text style={styles.infoTitle}>제품명: {item.itemName}</Text>
              <Text style={styles.infoText}>약의 효능: {item.efcyQesitm}</Text>
              <Text style={styles.infoText}>주의사항: {item.atpnQesitm}</Text>
              <Text style={styles.infoText}>
                보관 방법: {item.depositMethodQesitm}
              </Text>
              <Text style={styles.infoText}>제조사: {item.entpName}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>해당 약품에 대한 정보가 없습니다.</Text>
        )}
      </ScrollView>
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
  medicationName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  company: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24
  },
  storageList: {
    gap: 12
  },
  storageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  storageText: {
    fontSize: 16,
    color: "#444"
  },
  warningList: {
    gap: 12
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8
  },
  warningText: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    lineHeight: 24
  }
});
