import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
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
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "아이의 증상을 입력해주세요."
    },
    {
      type: "user",
      text: "아이가 열이 나고 아파요. 현재 열려 있는 병원을 알려주세요."
    },
    {
      type: "bot",
      text: "아이의 증상이 열과 아픔으로 확인되었습니다. 지금 바로 근처에 열려 있는 병원을 찾아드릴게요."
    },
    {
      type: "bot",
      text: "위치 정보 확인 완료! 근처 병원을 검색 중입니다..."
    }
  ]);
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  // ... 다른 핸들러 함수들 유지 ...

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView style={styles.safe}>
        {/* ... 헤더와 타이틀 유지 ... */}

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

          {/* ... 버튼 그룹 유지 ... */}
        </ScrollView>

        {/* ... 입력창 유지 ... */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ... 기존 스타일 유지 ...

  botName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginLeft: 4
  },

  // ... 나머지 스타일 유지 ...
});