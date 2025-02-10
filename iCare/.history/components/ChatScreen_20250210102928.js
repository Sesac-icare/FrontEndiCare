import React, { useState } from "react";
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

export default function ChatScreen() {
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>아이케어봇</Text>
        </View>

        <ScrollView style={styles.chatContainer}>
          {/* 봇 프로필 */}
          <Text style={styles.botProfile}>아이케어봇</Text>

          {/* 첫 인사 메시지 */}
          <View style={styles.grayBox}>
            <Text style={styles.messageText}>
              안녕하세요! 저는 아이케어봇이에요. 😊{"\n"}
              아이의 건강과 관련된 정보를 도와드릴게요.
            </Text>
          </View>

          {/* 버튼 그룹 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.whiteButton}>
              <Text style={styles.buttonText}>약국 찾기 💊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteButton}>
              <Text style={styles.buttonText}>병원 찾기 🏥</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteButton}>
              <Text style={styles.buttonText}>약 봉투 등록 ➕</Text>
            </TouchableOpacity>
          </View>

          {/* 사용자 메시지 */}
          <View style={styles.greenBox}>
            <Text style={styles.whiteText}>
              아이가 열이 나고 아파요. 현재 열려 있는 병원을 알려주세요.
            </Text>
          </View>
        </ScrollView>

        {/* 입력창 */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="mic" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력해주세요."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <MaterialIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    flex: 1
  },
  header: {
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600"
  },
  chatContainer: {
    flex: 1,
    padding: 16
  },
  botProfile: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  grayBox: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    maxWidth: "80%",
    marginBottom: 24
  },
  greenBox: {
    backgroundColor: "#12b67a",
    padding: 16,
    borderRadius: 12,
    maxWidth: "80%",
    alignSelf: "flex-end",
    marginBottom: 24
  },
  messageText: {
    fontSize: 16,
    color: "#222",
    lineHeight: 24
  },
  whiteText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24
  },
  buttonGroup: {
    gap: 8,
    marginBottom: 24
  },
  whiteButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e8e8e8"
  },
  buttonText: {
    fontSize: 16,
    color: "#12b67a",
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#f5f5f5"
  },
  iconButton: {
    padding: 8
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100
  },
  sendButton: {
    padding: 8,
    backgroundColor: "#12b67a",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
}); 