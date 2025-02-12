import React, { useState, useRef } from "react";
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
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "안녕하세요! 저는 아이케어봇이에요. 😊\n아이의 건강과 관련된 정보를 도와드릴게요."
    }
  ]);
  const scrollViewRef = useRef();

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
    // Implementation for prescription upload
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message
    };

    setMessages([...messages, userMessage]);
    setMessage("");

    try {
      const response = await axios.post(
        "http://172.16.217.175:8000/chat/chatbot/",
        {
          question: message
        }
      );

      if (response.data && response.data.message) {
        const botMessage = {
          type: "bot",
          text: response.data.message
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        type: "bot",
        text: "죄송합니다. 메시지 전송 중 오류가 발생했습니다."
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
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
                <Text
                  style={
                    msg.type === "user" ? styles.whiteText : styles.messageText
                  }
                >
                  {msg.text}
                </Text>
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
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.micButton}>
              <View style={styles.micIconContainer}>
                <MaterialIcons name="mic" size={24} color="#666" />
              </View>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="메시지를 입력해주세요."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
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
  micButton: {
    marginRight: 4
  },
  micIconContainer: {
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
  }
});
