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
        <View style={styles.cameraContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCamera(false)}
          >
            <MaterialIcons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={async () => {
              if (this.camera) {
                const photo = await this.camera.takePictureAsync();
                handlePictureTaken(photo);
              }
            }}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
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
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => setImage(null)}
                >
                  <Text style={styles.retakeText}>다시 촬영</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={takePicture}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={32}
                      color="#CCCCCC"
                    />
                    <Text style={styles.uploadText}>스캔하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                  >
                    <MaterialIcons
                      name="photo-library"
                      size={32}
                      color="#CCCCCC"
                    />
                    <Text style={styles.uploadText}>사진첩에서 불러오기</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.guideText}>
                  문서를 평평한 곳에 놓고 스캔해 주세요
                </Text>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            !image && styles.registerButtonDisabled
          ]}
          disabled={!image}
        >
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
    padding: 24
  },
  inputSection: {
    marginBottom: 32
  },
  label: {
    fontSize: 16,
    color: "#222",
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
    backgroundColor: "#fff"
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12,
    width: "45%"
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
    lineHeight: 20,
    marginTop: 16
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 24
  },
  registerButtonDisabled: {
    backgroundColor: "#CCCCCC"
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8
  },
  camera: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    padding: 24
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 24,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20
  },
  captureButton: {
    alignSelf: "center",
    marginBottom: 40,
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
  }
});
