import React, { useState, useEffect } from "react";
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
  ScrollView,
  Button
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // 컴포넌트 마운트 시 위치 권한 요청
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
        }
      } catch (error) {
        console.error("위치 권한 요청 실패:", error);
      }
    })();
  }, []);

  // 버튼 활성화 여부를 확인하는 함수
  const isLoginButtonEnabled = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }

      const loginData = {
        email,
        password
      };

      const response = await axios.post(
        "http://172.16.217.175:8000/users/login/",
        loginData,
        {
          timeout: 30000
        }
      );

      const data = response.data;

      if (data.token) {
        if (userLocation) {
          try {
            await axios.post(
              "http://:8000/users/update-location/",
              {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude
              },
              {
                headers: {
                  Authorization: `Token ${data.token}`
                }
              }
            );
          } catch (locationError) {
            console.error("위치 정보 업데이트 실패:", locationError);
          }
        }

        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
        navigation.navigate("MainTabs");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.code === "ECONNABORTED") {
        alert("서버 응답이 지연되고 있습니다.\n잠시 후 다시 시도해주세요.");
        return;
      }

      if (error.response?.data?.error) {
        if (
          error.response.data.error.includes(
            "User with this email does not exist"
          )
        ) {
          alert("등록되지 않은 이메일입니다.\n회원가입을 먼저 진행해주세요.");
          return;
        }
      }

      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
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
            <Text style={styles.loginButtonText}>로그인</Text>
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
