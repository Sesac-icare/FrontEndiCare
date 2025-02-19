import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "안녕하세요! 저는 아이케어봇이에요. 😊\n아이의 건강과 관련된 정보를 도와드릴게요."
    }
  ]);
  const scrollViewRef = useRef();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // 토큰 가져오기
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

  const handlePharmacySearch = () => {
    setMessages([
      ...messages,
      {
        type: "bot",
        text: "약국을 찾아드릴게요. 찾으시려는 지역의 주소를 입력해주세요.\n(예: 서울시 도봉구 창동)"
      }
    ]);
  };

  const handleHospitalSearch = () => {
    setMessages([
      ...messages,
      {
        type: "bot",
        text: "병원을 찾아드릴게요. 찾으시려는 지역의 주소를 입력해주세요.\n(예: 서울시 도봉구 창동)"
      }
    ]);
  };

  const handlePrescriptionUpload = () => {
    navigation.navigate("RegisterPrescription");
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    if (!userToken) {
      Alert.alert("오류", "로그인이 필요한 서비스입니다.");
      return;
    }

    const userMessage = {
      type: "user",
      text: message
    };

    setMessages([...messages, userMessage]);
    setMessage("");

    try {
      const response = await axios.post(
        "http://172.16.217.175:8000/chat/unified/",
        {
          message: message,
          session_id: `session_${Date.now()}`
        },
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("서버 응답 데이터:", response.data);

      // start_message 표시
      if (response.data.start_message && response.data.start_message.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: response.data.start_message
          }
        ]);
      }

      // data 처리 (병원 리스트인 경우)
      if (
        response.data.type === "hospital_list" ||
        response.data.type === "pharmacy_list"
      ) {
        const listMessage = {
          type: "bot",
          isHospitalList: true, // 병원/약국 리스트 표시용 플래그
          hospitals: response.data.data.map((item) => ({
            ...item,
            hospital_type:
              response.data.type === "pharmacy_list"
                ? "약국"
                : item.hospital_type
          }))
        };
        setMessages((prev) => [...prev, listMessage]);
      }

      // end_message 표시
      if (response.data.end_message && response.data.end_message.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: response.data.end_message
          }
        ]);
      }
    } catch (error) {
      console.error("에러 상세 정보:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      const errorMessage = {
        type: "bot",
        text: "죄송합니다. 메시지 전송 중 오류가 발생했습니다."
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const startRecording = async () => {
    try {
      // 이전 녹음 객체가 있다면 정리
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }

      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("권한 필요", "음성 인식을 위해 마이크 권한이 필요합니다.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync({
        android: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000
        },
        ios: {
          extension: ".wav",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCM: true,
          audioFormat: Audio.RECORDING_OPTION_IOS_AUDIO_FORMAT_LINEARPCM
        }
      });

      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("녹음 시작 오류:", error);
      Alert.alert("오류", "녹음을 시작할 수 없습니다.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      if (!userToken) {
        Alert.alert("오류", "로그인이 필요한 서비스입니다.");
        return;
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      // 녹음 객체 정리
      setRecording(null);
      setIsRecording(false);

      const formData = new FormData();
      formData.append("audio", {
        uri: uri,
        type: "audio/wav",
        name: "voice_recording.wav"
      });
      formData.append("need_voice", "true"); // 음성 입력은 음성 응답 필요

      const response = await axios.post(
        "http://172.16.217.175:8000/chat/unified/",
        formData,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.input_text && response.data.input_text.trim()) {
        // 사용자 음성 메시지 표시
        setMessages((prev) => [
          ...prev,
          {
            type: "user",
            text: response.data.input_text
          }
        ]);

        // GPT 응답 표시
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: response.data.response_text
          }
        ]);

        // 음성 응답 재생 설정 수정
        if (response.data.audio) {
          const sound = new Audio.Sound();
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false, // 스피커로 재생
            volume: 1.0 // 최대 볼륨
          });

          await sound.loadAsync({
            uri: `data:${response.data.audio_type};base64,${response.data.audio}`
          });

          await sound.setVolumeAsync(1.0); // 볼륨을 최대로 설정
          await sound.playAsync();
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "음성이 인식되지 않았습니다."
          }
        ]);
      }
    } catch (error) {
      console.error("Recording error:", error);
      if (error.response?.status === 401) {
        Alert.alert("오류", "인증이 만료되었습니다. 다시 로그인해주세요.");
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "음성 처리 중 오류가 발생했습니다."
          }
        ]);
      }
    }
  };

  const renderHospitalItem = (hospital) => {
    return (
      <View style={styles.hospitalItem}>
        <View style={styles.hospitalHeader}>
          <View style={styles.typeLabel}>
            <Text style={styles.typeText}>
              {hospital.hospital_type || "약국"}
            </Text>
          </View>
          <Text
            style={[
              styles.stateText,
              hospital.state === "영업중"
                ? styles.openStatus
                : styles.closedStatus
            ]}
          >
            {hospital.state}
          </Text>
        </View>

        <Text style={styles.hospitalName}>{hospital.name}</Text>

        <View style={styles.infoContainer}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{hospital.address}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="phone" size={16} color="#666" />
          <Text style={styles.infoText}>{hospital.phone}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.infoText}>
            {hospital.weekday_hours?.mon?.start || ""} ~{" "}
            {hospital.weekday_hours?.mon?.end || ""}
          </Text>
        </View>

        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>{hospital.distance}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView style={styles.safe}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Image
            source={require("../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 타이틀
        <View style={styles.titleContainer}>
          <Text style={styles.title}>아이케어봇</Text>
        </View> */}

        <ScrollView
          style={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          {/* 메시지 목록 */}
          {messages.map((msg, index) => (
            <View key={index}>
              {msg.type === "bot" && (
                <Text style={styles.botName}>아이케어봇</Text>
              )}
              <View
                style={msg.type === "user" ? styles.greenBox : styles.grayBox}
              >
                {msg.isHospitalList ? (
                  <View style={styles.listContainer}>
                    {msg.hospitals.map((hospital, idx) => (
                      <View key={idx}>{renderHospitalItem(hospital)}</View>
                    ))}
                  </View>
                ) : (
                  <Text
                    style={
                      msg.type === "user"
                        ? styles.whiteText
                        : styles.messageText
                    }
                  >
                    {msg.text}
                  </Text>
                )}
              </View>
            </View>
          ))}

          {/* 버튼 그룹 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={handlePharmacySearch}
            >
              <Text style={styles.buttonText}>약국 찾기 💊</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={handleHospitalSearch}
            >
              <Text style={styles.buttonText}>병원 찾기 🏥</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.whiteButton, styles.wideButton]}
              onPress={handlePrescriptionUpload}
            >
              <Text style={styles.buttonText}>약 봉투 등록 ➕</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* 입력창 */}
        <View style={styles.inputOuterContainer}>
          <View
            style={[
              styles.inputContainer,
              isRecording && styles.inputContainerRecording
            ]}
          >
            <TouchableOpacity
              style={styles.voiceButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <MaterialIcons
                name={isRecording ? "mic-off" : "mic"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="메시지를 입력해주세요."
                placeholderTextColor="#999"
                value={isRecording ? `음성 입력 중${loadingDots}` : message}
                onChangeText={setMessage}
                multiline
                editable={!isRecording}
              />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <MaterialIcons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  logo: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto"
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  grayBox: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    maxWidth: "auto",
    alignSelf: "flex-start",
    marginBottom: 16,
    marginLeft: 4,
    marginRight: 48
  },
  greenBox: {
    backgroundColor: "#00B386",
    padding: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    maxWidth: "65%",
    alignSelf: "flex-end",
    marginBottom: 12,
    marginRight: 8,
    marginLeft: 48
  },
  messageText: {
    fontSize: 15,
    color: "#222",
    lineHeight: 22,
    flexShrink: 1
  },
  whiteText: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    flexShrink: 1
  },
  botName: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
    marginLeft: 8,
    fontWeight: "500"
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 4
  },
  whiteButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  buttonText: {
    fontSize: 14,
    color: "#016A4C",
    textAlign: "center",
    fontWeight: "600"
  },
  wideButton: {
    marginTop: 4,
    width: "auto",
    alignSelf: "flex-start"
  },
  inputOuterContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: Platform.OS === "ios" ? 8 : 8
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  inputContainerRecording: {
    backgroundColor: "#E8F5F0" // 옅은 초록색
  },
  voiceButton: {
    marginRight: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 4
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16,
    color: "#222",
    maxHeight: 100
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#016a4c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4
  },
  listContainer: {
    width: "100%",
    gap: 8
  },
  hospitalItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  typeLabel: {
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  typeText: {
    color: "#016A4C",
    fontSize: 12,
    fontWeight: "600"
  },
  stateText: {
    fontSize: 12,
    color: "#666"
  },
  openStatus: {
    color: "#016A4C"
  },
  closedStatus: {
    color: "#FF0000"
  },
  hospitalName: {
    fontSize: 14,
    color: "#222",
    marginBottom: 8
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  infoText: {
    marginLeft: 4,
    color: "#666"
  },
  distanceContainer: {
    marginTop: 8,
    alignItems: "flex-end"
  },
  distanceText: {
    color: "#666"
  }
});
