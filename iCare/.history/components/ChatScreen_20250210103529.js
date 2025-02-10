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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
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

        {/* 타이틀 */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>아이케어봇</Text>
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
          <TouchableOpacity style={styles.sendButton}>
            <MaterialIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
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
  container: {
    flex: 1
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
  titleContainer: {
    padding: 16,
    backgroundColor: "#f9fafb"
  },
  title: {
    fontSize: 20,
    color: "#222",
    fontWeight: "600"
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb"
  },
  grayBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    maxWidth: "85%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  greenBox: {
    backgroundColor: "#12b67a",
    padding: 16,
    borderRadius: 12,
    maxWidth: "85%",
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
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  buttonText: {
    fontSize: 16,
    color: "#12b67a",
    textAlign: "center",
    fontWeight: "600"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: Platform.OS === "ios" ? 30 : 8
  },
  micButton: {
    marginRight: 8
  },
  micIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    marginRight: 8,
    paddingHorizontal: 4
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    maxHeight: 100
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#016a4c",
    justifyContent: "center",
    alignItems: "center"
  }
});
