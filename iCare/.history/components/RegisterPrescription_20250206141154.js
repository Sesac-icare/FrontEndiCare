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
import * as ImagePicker from 'expo-image-picker';  // expo-image-picker 추가

export default function RegisterPrescription() {
  const navigation = useNavigation();
  const [childName, setChildName] = useState("");
  const [image, setImage] = useState(null);

  // 카메라/갤러리 접근 권한 요청
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 접근 권한이 필요합니다.');
      return false;
    }
    return true;
  };

  // 이미지 선택 처리
  const pickImage = async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // 여기에 OCR 처리 로직 추가 예정
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ... header 부분 유지 ... */}

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
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={pickImage}
                >
                  <MaterialIcons name="photo-camera" size={32} color="#CCCCCC" />
                  <Text style={styles.uploadText}>사진첩에서 불러오기</Text>
                </TouchableOpacity>
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
          <MaterialIcons
            name="add"
            size={24}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... 기존 스타일 유지 ...
  previewContainer: {
    width: '100%',
    alignItems: 'center'
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16
  },
  retakeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  retakeText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500'
  },
  registerButtonDisabled: {
    backgroundColor: '#CCCCCC'
  }
});