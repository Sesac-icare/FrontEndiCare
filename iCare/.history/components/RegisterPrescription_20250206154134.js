import React, { useState, useEffect } from "react";
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
  const [camera, setCamera] = useState(null);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');
      }
    })();
  }, []);

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
    if (Platform.OS === 'web') {
      alert('웹에서는 카메라를 사용할 수 없습니다.');
      return false;
    }

    try {
      if (!cameraPermission) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('카메라를 사용하기 위해서는 권한이 필요합니다.\n설정에서 카메라 권한을 허용해주세요.');
          return false;
        }
        setCameraPermission(true);
      }
      return true;
    } catch (error) {
      console.log('Camera permission error:', error);
      alert('카메라 권한을 확인하는 중 오류가 발생했습니다.');
      return false;
    }
  };

  const takePicture = async () => {
    if (!cameraPermission) {
      const hasPermission = await getCameraPermission();
      if (!hasPermission) return;
    }
    setShowCamera(true);
  };

  const handleCapture = async () => {
    if (!camera) return;

    try {
      setScanning(true);
      const photo = await camera.takePictureAsync({
        quality: 1,
        skipProcessing: true // 처리 속도 향상
      });
      
      if (photo) {
        setImage(photo.uri);
        setShowCamera(false);
      }
    } catch (error) {
      console.log("Capture error:", error);
      alert("사진 촬영에 실패했습니다.");
    } finally {
      setScanning(false);
    }
  };

  const handleRegister = () => {
    if (!childName.trim()) {
      setNameError(true);
      alert("자녀 이름을 입력해주세요.");
      return;
    }
    // 여기에 등록 로직 추가
  };

  if (showCamera) {
    return (
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref => setCamera(ref)}
        ratio="4:3"
        autoFocus={Camera.Constants.AutoFocus.on}
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
                onPress={handleCapture}
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
          <Text style={styles.headerTitle}>약국봉투 등록</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>자녀 이름</Text>
            <TextInput
              style={[styles.input, nameError && styles.inputError]}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#999"
              value={childName}
              onChangeText={(text) => {
                setChildName(text);
                setNameError(false);
              }}
            />
            {nameError && (
              <Text style={styles.errorText}>자녀 이름을 입력해주세요</Text>
            )}
          </View>

          <View style={styles.imageContainer}>
            {image ? (
              <View style={styles.previewContainer}>
                <Image source={{ uri: image }} style={styles.preview} />
                <View style={styles.previewStatus}>
                  <View style={styles.statusBadge}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#016A4C"
                    />
                    <Text style={styles.statusText}>스캔 완료</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="camera-alt" size={48} color="#CCCCCC" />
                <Text style={styles.emptyText}>
                  문서를 평평한 곳에 놓고{"\n"}스캔해 주세요
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          {image ? (
            <>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => setImage(null)}
              >
                <MaterialIcons name="refresh" size={24} color="#016A4C" />
                <Text style={styles.uploadButtonText}>다시 촬영</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleRegister}
              >
                <View style={styles.buttonContent}>
                  <Text style={[styles.buttonText, styles.buttonTextWithIcon]}>
                    등록하기
                  </Text>
                  <MaterialIcons name="add" size={24} color="#fff" />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePicture}
              >
                <View style={styles.buttonContent}>
                  <MaterialIcons name="photo-camera" size={24} color="#fff" />
                  <Text style={[styles.buttonText, styles.buttonTextWithIcon]}>
                    스캔하기
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <MaterialIcons name="photo-library" size={24} color="#016A4C" />
                <Text style={styles.uploadButtonText}>사진첩에서 불러오기</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    flex: 1,
    marginLeft: 40 // 뒤로가기 버튼 공간만큼 여백
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb"
  },
  inputSection: {
    marginBottom: 24
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
    backgroundColor: "#fff"
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
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24
  },
  previewContainer: {
    flex: 1,
    position: "relative"
  },
  preview: {
    flex: 1,
    borderRadius: 12
  },
  previewStatus: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  statusText: {
    color: "#016A4C",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4
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
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12
  },
  cameraButton: {
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  },
  buttonTextWithIcon: {
    marginLeft: 8,
    marginRight: 8
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8"
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginLeft: 8
  },
  inputError: {
    borderColor: "#FF4444"
  },
  errorText: {
    color: "#FF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  }
});
