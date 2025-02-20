import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getApiUrl, ENDPOINTS } from '../config/api';

export default function MedicationDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicationName } = route.params; // 약품명을 route params로 받음

  const [drugInfo, setDrugInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugInfo = async () => {
      try {
        const response = await fetch(getApiUrl(ENDPOINTS.drugInfo), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ drugName: medicationName })
        });

        const data = await response.json();
        
        if (data.type === "no_results") {
          Alert.alert("알림", data.message, [
            { text: "확인", onPress: () => navigation.goBack() }
          ]);
          return;
        }

        if (!response.ok) {
          throw new Error("약품 정보를 불러오는데 실패했습니다.");
        }

        if (data.type === "success") {
          setDrugInfo(data.data[0]);
        } else {
          setError("약품 정보를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        setError("약품 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrugInfo();
  }, [medicationName]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#016A4C" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !drugInfo) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || "약품 정보를 찾을 수 없습니다."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
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

      {/* 서브 헤더 */}
      <View style={styles.subHeader}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="medical-services" size={24} color="#016A4C" />
          <Text style={styles.pageTitle}>약품 정보</Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* 약 정보 카드 */}
        <View style={styles.medicationCard}>
          <Text style={styles.medicationName}>{drugInfo.itemName}</Text>
          <View style={styles.infoContainer}>
            <MaterialIcons name="business" size={16} color="#666" />
            <Text style={styles.infoText}>{drugInfo.entpName}</Text>
          </View>
        </View>

        {/* 효능 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>효능・효과</Text>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>{drugInfo.efcyQesitm}</Text>
          </View>
        </View>

        {/* 주의사항 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>복약 주의사항</Text>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>{drugInfo.atpnQesitm}</Text>
          </View>
        </View>

        {/* 보관방법 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>보관방법</Text>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>{drugInfo.depositMethodQesitm}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  backButton: {
    padding: 4,
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#016A4C',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  warningContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});
