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
import axios from "axios";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 버튼 활성화 여부를 확인하는 함수
  const isLoginButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isLoginButtonEnabled) return;

    try {
      const response = await axios.post(
        "http://172.16.217.175:8000/users/login/",
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.token) {
        const { token, user } = response.data;
        // TODO: 토큰을 안전하게 저장하는 로직 추가 (예: AsyncStorage)
        navigation.navigate("MainTabs");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);

      if (error.response) {
        // 서버가 응답한 구체적인 에러 메시지가 있는 경우
        if (error.response.data.error) {
          // "User with this email does not exist" 에러 처리
          if (
            error.response.data.error.includes(
              "User with this email does not exist"
            )
          ) {
            alert("등록되지 않은 이메일입니다.\n회원가입을 먼저 진행해주세요.");
            return;
          }
        }

        if (error.response.data.email) {
          alert(error.response.data.email[0]);
        } else if (error.response.data.password) {
          alert(error.response.data.password[0]);
        } else if (error.response.data.non_field_errors) {
          alert(error.response.data.non_field_errors[0]);
        } else if (error.response.status === 400) {
          alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        alert("서버와 통신할 수 없습니다. 인터넷 연결을 확인해주세요.");
      } else {
        // 요청 설정 중 에러가 발생한 경우
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/HeaderGreenLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
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
            <Text
              style={[
                styles.loginButtonText,
                !isLoginButtonEnabled && styles.loginButtonTextDisabled
              ]}
            >
              로그인
            </Text>
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
  logo: {
    width: 80,
    height: 80
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
    paddingBottom: Platform.OS === "ios" ? 34 : 24
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
