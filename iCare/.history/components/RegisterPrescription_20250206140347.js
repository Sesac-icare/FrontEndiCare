import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RegisterPrescription() {
  const navigation = useNavigation();
  const [childName, setChildName] = useState("");

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
          <Text style={styles.headerTitle}>약국봉투 등록하기</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>자녀 이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#999"
              value={childName}
              onChangeText={setChildName}
            />
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.uploadButton}>
              <MaterialIcons name="photo-camera" size={32} color="#CCCCCC" />
              <Text style={styles.uploadText}>사진첩에서 불러오기</Text>
            </TouchableOpacity>
            <Text style={styles.guideText}>
              문서를 평평한 곳에 놓고 스캔해 주세요
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>등록하기</Text>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
    padding: 4
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginRight: 28 // 뒤로가기 버튼 너비만큼 오른쪽 마진
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb"
  },
  inputSection: {
    marginBottom: 32
  },
  label: {
    fontSize: 16,
    color: "#016A4C",
    marginBottom: 12,
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderStyle: "dashed"
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12
  },
  uploadText: {
    color: "#016A4C",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "600"
  },
  guideText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    padding: 16,
    margin: 24,
    borderRadius: 12,
    marginBottom: Platform.OS === "ios" ? 34 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8
  }
});
