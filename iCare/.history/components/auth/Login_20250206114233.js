import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 버튼 활성화 여부를 확인하는 함수
  const isLoginButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    if (!isLoginButtonEnabled) return;
    
    // 테스트를 위해 API 호출 없이 바로 메인 화면으로 이동
    navigation.navigate("MainTabs");

    /* 실제 API 연동 코드는 주석 처리
    fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        navigation.navigate("MainTabs");
      }
    })
    .catch(error => {
      if (error.response?.status === 400) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    });
    */
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="medical-services" size={60} color="#016A4C" />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={[
              styles.loginButton,
              !isLoginButtonEnabled && styles.loginButtonDisabled
            ]}
            onPress={handleLogin}
            disabled={!isLoginButtonEnabled}
          >
            <Text style={[
              styles.loginButtonText,
              !isLoginButtonEnabled && styles.loginButtonTextDisabled
            ]}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>회원가입</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60
  },
  inputSection: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    color: "#222",
    marginBottom: 8,
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#222222"
  },
  buttonWrapper: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24
  },
  loginButton: {
    backgroundColor: "#016A4C",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12
  },
  loginButtonDisabled: {
    backgroundColor: "#CCCCCC"
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  loginButtonTextDisabled: {
    color: "#999999"
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#016A4C"
  },
  buttonText: {
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "600"
  }
}); 