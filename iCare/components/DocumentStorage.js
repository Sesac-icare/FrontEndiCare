import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DocumentStorage({ route }) {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.error("토큰 가져오기 실패:", error);
      }
    };
    getToken();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        "http://172.16.220.253:8000/prescriptions/list/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.results) {
        const formattedPrescriptions = response.data.results.map((item) => ({
          documentId: item.envelope_id.toString(),
          childName: item.child_name,
          date: new Date(item.prescription_date)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, "."),
          pharmacyName: item.pharmacy_name,
          prescriptionNumber: item.prescription_number,
        }));

        setPrescriptions(formattedPrescriptions);
      }
    } catch (error) {
      console.error("처방전 목록 가져오기 실패:", error);
      if (error.response?.status === 401) {
        Alert.alert("오류", "인증이 만료되었습니다. 다시 로그인해주세요.");
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert("오류", "처방전 목록을 불러오는데 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptionsByDate = async () => {
    try {
      const response = await axios.get(
        "http://172.16.220.253:8000/prescriptions/by-date/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.results) {
        const formattedPrescriptions = response.data.results.map((item) => ({
          documentId: item.envelope_id.toString(),
          childName: item.child_name,
          date: new Date(item.prescription_date)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, "."),
          pharmacyName: item.pharmacy_name,
          prescriptionNumber: item.prescription_number,
        }));

        setPrescriptions(formattedPrescriptions);
        setSortByDate(true);
      }
    } catch (error) {
      console.error("처방전 정렬 실패:", error);
      if (error.response?.status === 401) {
        Alert.alert("오류", "인증이 만료되었습니다. 다시 로그인해주세요.");
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert("오류", "처방전 목록을 불러오는데 실패했습니다.");
      }
    }
  };

  const handleSort = () => {
    if (!sortByDate) {
      fetchPrescriptionsByDate();
    } else {
      fetchPrescriptions();
      setSortByDate(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchPrescriptions();
    }
  }, [userToken]);

  useEffect(() => {
    if (route.params?.newPrescription && userToken) {
      fetchPrescriptions();
    }
  }, [route.params?.newPrescription]);

  const handleDelete = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // 삭제 API 호출
      const response = await axios.delete(
        `http://172.16.220.253:8000/prescriptions/prescriptions/${selectedPrescription.documentId}/`,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        // 삭제 성공
        Alert.alert("알림", "처방전이 삭제되었습니다.");
        // 목록 새로고침을 위해 fetchPrescriptions 호출
        await fetchPrescriptions();
      }
    } catch (error) {
      console.error("처방전 삭제 실패:", error);
      if (error.response?.status === 401) {
        Alert.alert("오류", "인증이 만료되었습니다. 다시 로그인해주세요.");
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        Alert.alert("오류", "처방전 삭제에 실패했습니다.");
      }
    } finally {
      setShowDeleteModal(false);
      setSelectedPrescription(null);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.documentId}
      style={styles.prescriptionItem}
      onPress={() =>
        navigation.navigate("PrescriptionDetail", { prescription: item })
      }
    >
      <View style={styles.itemContent}>
        <View style={styles.nameTag}>
          <Text style={styles.childName}>{item.childName}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.pharmacyName}>{item.pharmacyName}</Text>
        <Text style={styles.documentId}>교부번호: {item.documentId}</Text>
      </View>
      <View style={styles.itemActions}>
        <MaterialIcons
          name="chevron-right"
          size={24}
          color="#CCCCCC"
          style={styles.chevron}
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <MaterialIcons name="delete-outline" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
            <Text style={styles.pageTitle}>서류보관함</Text>
            <Text style={styles.documentCount}>
              (총 {prescriptions.length}개)
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortByDate && styles.filterButtonActive,
            ]}
            onPress={handleSort}
          >
            <Text
              style={[styles.filterText, sortByDate && styles.filterTextActive]}
            >
              {sortByDate ? "기본순" : "최신순"}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={sortByDate ? "#016A4C" : "#666666"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {loading ? (
            <View style={styles.centerContainer}>
              <Text>로딩 중...</Text>
            </View>
          ) : prescriptions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="description" size={80} color="#CCCCCC" />
              </View>
              <Text style={styles.emptyText}>
                약국봉투를 등록하고{"\n"}
                처방전을 관리해보세요
              </Text>
              <Text style={styles.subText}>채팅으로도 등록할 수 있습니다.</Text>
            </View>
          ) : (
            <FlatList
              data={prescriptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.documentId}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </ScrollView>

        {/* 하단에 고정된 버튼 */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("RegisterPrescription")}
          >
            <MaterialIcons name="medication" size={24} color="#fff" />
            <Text style={styles.addButtonText}>약국봉투 등록하기</Text>
          </TouchableOpacity>
        </View>

        {/* 이미지 보기 모달 */}
        <Modal
          visible={showImageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowImageModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowImageModal(false)}
              >
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </Modal>

        {/* 삭제 확인 모달 */}
        <Modal
          visible={showDeleteModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContent}>
              <Text style={styles.deleteModalTitle}>
                처방전을 삭제하시겠습니까?
              </Text>
              <Text style={styles.deleteModalSubtitle}>
                삭제된 처방전은 복구할 수 없습니다.
              </Text>
              <View style={styles.deleteModalButtons}>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.cancelButton]}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.confirmButton]}
                  onPress={confirmDelete}
                >
                  <Text style={styles.confirmButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 4,
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#016A4C",
    marginRight: 8,
  },
  documentCount: {
    fontSize: 14,
    color: "#666",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: "#666666",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  emptyContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 12,
    fontWeight: "600",
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 40,
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  prescriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  nameTag: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  childName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#016A4C",
  },
  date: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#016A4C",
    marginBottom: 6,
  },
  documentId: {
    fontSize: 14,
    color: "#666",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#FFF2F2",
    borderRadius: 8,
  },
  chevron: {
    color: "#CCCCCC",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  modalHeader: {
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  closeButton: {
    padding: 8,
  },
  modalImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteModalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  deleteModalSubtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  deleteModalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  deleteModalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  confirmButton: {
    backgroundColor: "#FF4444",
  },
  cancelButtonText: {
    color: "#444",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
