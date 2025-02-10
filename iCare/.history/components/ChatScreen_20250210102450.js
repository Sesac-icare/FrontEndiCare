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

        {/* 채팅 내용 */}
        <ScrollView style={styles.chatContainer}>
          {/* 봇 메시지 */}
          <View style={styles.botMessageContainer}>
            <Text style={styles.botName}>아이케어봇</Text>
            <View style={styles.botMessage}>
              <Text style={styles.messageText}>
                안녕하세요! 저는 아이케어봇이에요. 😊{"\n"}
                아이의 건강과 관련된 정보를 도와드릴게요.
              </Text>
            </View>
          </View>

          {/* 버튼 그룹 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="local-pharmacy" size={20} color="#016A4C" />
              <Text style={styles.actionButtonText}>약국 찾기 💊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="local-hospital" size={20} color="#016A4C" />
              <Text style={styles.actionButtonText}>병원 찾기 🏥</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.wideButton]}>
              <MaterialIcons name="add" size={20} color="#016A4C" />
              <Text style={styles.actionButtonText}>약 봉투 등록 ➕</Text>
            </TouchableOpacity>
          </View>

          {/* 봇 응답 메시지 */}
          <View style={styles.botMessageContainer}>
            <View style={styles.botMessage}>
              <Text style={styles.messageText}>
                아이가 열이 나고 아파요. 현재 열려 있는 병원을 알려주세요.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* 메시지 입력 영역 */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TouchableOpacity style={styles.micButton}>
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
            <MaterialIcons name="send" size={24} color="#016A4C" />
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
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222"
  },
  chatContainer: {
    flex: 1,
    padding: 16
  },
  botMessageContainer: {
    marginBottom: 16
  },
  botName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8
  },
  botMessage: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    maxWidth: "80%"
  },
  messageText: {
    fontSize: 16,
    color: "#222",
    lineHeight: 24
  },
  buttonGroup: {
    marginVertical: 16,
    gap: 8
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    gap: 8
  },
  wideButton: {
    marginTop: 4
  },
  actionButtonText: {
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "500"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  micButton: {
    padding: 8
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100
  },
  sendButton: {
    padding: 8
  }
}); 