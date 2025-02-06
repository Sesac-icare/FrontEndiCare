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
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DocumentStorage({ route }) {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  // 새로운 처방전 데이터가 전달되면 리스트에 추가
  useEffect(() => {
    if (route.params?.newPrescription) {
      setPrescriptions(prevPrescriptions => [
        route.params.newPrescription,
        ...prevPrescriptions
      ]);
    }
  }, [route.params?.newPrescription]);

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
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>최신순</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {prescriptions.length === 0 ? (
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
            prescriptions.map((prescription) => (
              <TouchableOpacity
                key={prescription.documentId}
                style={styles.prescriptionItem}
                onPress={() => {
                  setSelectedImage(prescription.imageUri);
                  setShowImageModal(true);
                }}
              >
                <View style={styles.nameTag}>
                  <Text style={styles.childName}>{prescription.childName}</Text>
                </View>
                <Text style={styles.date}>{prescription.date}</Text>
                <Text style={styles.pharmacyName}>
                  {prescription.pharmacyName}
                </Text>
                <Text style={styles.documentId}>
                  교부번호: {prescription.documentId}
                </Text>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#CCCCCC"
                  style={styles.chevron}
                />
              </TouchableOpacity>
            ))
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
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222"
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
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#016A4C",
    marginRight: 8
  },
  documentCount: {
    fontSize: 14,
    color: "#666"
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#f9fafb"
  },
  content: {
    padding: 20
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
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  emptyText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 12,
    fontWeight: "600"
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 40
  },
  bottomButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0"
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%"
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  },
  prescriptionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: "100%",
    backgroundColor: "#fff"
  },
  nameTag: {
    backgroundColor: "#E8FEEE",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8
  },
  childName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#016A4C"
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#016A4C",
    marginBottom: 4
  },
  chevron: {
    position: "absolute",
    right: 20,
    top: "50%",
    marginTop: -12
  },
  date: {
    fontSize: 14,
    color: "#666"
  },
  documentId: {
    fontSize: 14,
    color: "#666"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000"
  },
  modalHeader: {
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  closeButton: {
    padding: 8
  },
  modalImage: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
