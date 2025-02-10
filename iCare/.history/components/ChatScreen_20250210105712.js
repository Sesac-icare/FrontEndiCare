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

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef();

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>아이케어봇</Text>
      </View>

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
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
            <MaterialIcons name="local-pharmacy" size={16} color="#12b67a" />
            <Text style={styles.buttonText}>약국 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteButton}>
            <MaterialIcons name="local-hospital" size={16} color="#12b67a" />
            <Text style={styles.buttonText}>병원 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.whiteButton, styles.wideButton]}>
            <MaterialIcons name="add" size={16} color="#12b67a" />
            <Text style={styles.buttonText}>약 봉투 등록</Text>
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.micButton}>
            <MaterialIcons name="mic" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력해주세요."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <MaterialIcons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
    textAlign: "center",
    marginRight: 28  // backButton의 너비만큼
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16
  },
  grayBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    maxWidth: "85%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  greenBox: {
    backgroundColor: "#12b67a",
    padding: 16,
    borderRadius: 16,
    maxWidth: "85%",
    alignSelf: "flex-end",
    marginBottom: 24
  },
  messageText: {
    fontSize: 15,
    color: "#222",
    lineHeight: 22
  },
  whiteText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22
  },
  buttonGroup: {
    gap: 8,
    marginBottom: 24
  },
  whiteButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  buttonText: {
    fontSize: 14,
    color: "#12b67a",
    fontWeight: "600"
  },
  wideButton: {
    marginTop: 4
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8
  },
  micButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    fontSize: 15,
    color: "#222",
    maxHeight: 100
  },
  sendButton: {
    padding: 8,
    backgroundColor: "#016a4c",
    borderRadius: 20
  }
});
