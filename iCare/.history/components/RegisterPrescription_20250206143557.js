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
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";

export default function RegisterPrescription() {
  const navigation = useNavigation();
  const [childName, setChildName] = useState("");
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("카메라 접근 권한이 필요합니다.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // 여기에 OCR 처리 로직 추가 예정
    }
  };

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
    if (status !== "granted") {
      alert("카메라 접근 권한이 필요합니다.");
      return false;
    }
    return true;
  };

  const takePicture = async () => {
    const hasPermission = await getCameraPermission();
    if (hasPermission) {
      setShowCamera(true);
    }
  };

  const handlePictureTaken = async (photo) => {
    setImage(photo.uri);
    setShowCamera(false);
    // 여기에 OCR 처리 로직 추가 예정
  };

  if (showCamera) {
    return (
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => (this.camera = ref)}
      >
        <SafeAreaView style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>처방전 스캔</Text>
          </View>

          {/* OCR 가이드 프레임 */}
          <View style={styles.scanFrame}>
            <View style={styles.scanCorner} />
            <View style={[styles.scanCorner, { right: 0 }]} />
            <View style={[styles.scanCorner, { bottom: 0 }]} />
            <View style={[styles.scanCorner, { bottom: 0, right: 0 }]} />
          </View>

          <View style={styles.cameraFooter}>
            {scanning ? (
              <View style={styles.scanningIndicator}>
                <Text style={styles.scanningText}>스캔 중...</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={async () => {
                  if (this.camera) {
                    setScanning(true);
                    const photo = await this.camera.takePictureAsync({
                      quality: 1,
                      base64: true // OCR을 위한 base64 데이터 포함
                    });
                    // OCR 처리 로직 추가 예정
                    setScanning(false);
                    handlePictureTaken(photo);
                  }
                }}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </Camera>
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
            {image ? (
              <View style={styles.previewContainer}>
                <Image source={{ uri: image }} style={styles.preview} />
                <Text style={styles.guideText}>
                  처방전이 잘 보이도록 촬영해주세요
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons
                  name="description"
                  size={80}
                  color="#CCCCCC"
                />
                <Text style={styles.emptyText}>
                  처방전을 등록해주세요
                </Text>
                <Text style={styles.guideText}>
                  문서를 평평한 곳에 놓고 스캔해 주세요
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          {image ? (
            <>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setImage(null)}
              >
                <Text style={styles.retakeText}>다시 촬영</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>등록하기</Text>
                <MaterialIcons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePicture}
              >
                <MaterialIcons name="photo-camera" size={24} color="#016A4C" />
                <Text style={styles.buttonText}>스캔하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImage}
              >
                <MaterialIcons name="photo-library" size={24} color="#666" />
                <Text style={styles.buttonText}>사진첩에서 불러오기</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
    marginBottom: 8,
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8
  },
  previewContainer: {
    width: "100%",
    alignItems: "center"
  },
  preview: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16
  },
  retakeButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  retakeText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500"
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016A4C",
    padding: 16,
    borderRadius: 12,
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
  },
  camera: {
    flex: 1,
    backgroundColor: "#000"
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },
  cameraHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  cameraTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  closeButton: {
    position: "absolute",
    left: 20,
    padding: 8,
    borderRadius: 20
  },
  scanFrame: {
    flex: 1,
    margin: 40,
    borderWidth: 1,
    borderColor: "#016A4C",
    borderStyle: "dashed"
  },
  scanCorner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#016A4C",
    borderWidth: 3
  },
  cameraFooter: {
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center"
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff"
  },
  scanningIndicator: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "rgba(1,106,76,0.8)"
  },
  scanningText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },
  bottomButtons: {
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12  // 버튼 사이 간격
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8"
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 12
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8
  }
});
