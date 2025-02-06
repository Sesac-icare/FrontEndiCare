import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Modal
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showConfirmIcon, setShowConfirmIcon] = useState(false);
  const [termAgreed, setTermAgreed] = useState(false);

  const handleSignUp = () => {
    if (!username || !email || !password || !passwordCheck) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (passwordMismatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signUpData = {
      username,
      email,
      password,
      passwordCheck,
      term_agreed: termAgreed
    };

    fetch("api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signUpData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          setShowModal(true);
        }
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          if (error.response.data.email) {
            alert("이미 사용 중인 이메일입니다.");
          } else if (error.response.data.password) {
            alert("비밀번호가 일치하지 않습니다.");
          }
        }
      });
  };

  const handleAgree = () => {
    setTermAgreed(true);
    setShowModal(false);
    navigation.navigate("MainTabs");
  };

  // 비밀번호 확인 입력 시 일치 여부 체크
  const checkPasswordMatch = (text) => {
    setPasswordCheck(text);
    setPasswordMismatch(password !== text);
    setShowConfirmIcon(text.length > 0);
  };

  // 이메일 입력 핸들러 수정
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" size={32} color="#CCCCCC" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#999"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
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
              onChangeText={(text) => {
                setPassword(text);
                if (passwordCheck) {
                  setPasswordMismatch(password !== text);
                }
              }}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                placeholderTextColor="#999"
                secureTextEntry
                value={passwordCheck}
                onChangeText={checkPasswordMatch}
              />
              {showConfirmIcon && (
                <MaterialIcons
                  name={passwordMismatch ? "error" : "check-circle"}
                  size={20}
                  color={passwordMismatch ? "#E53935" : "#016A4C"}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {passwordMismatch && (
              <Text style={styles.errorText}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>회원가입</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  고유식별정보의 수집 및 이용 동의
                </Text>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalText}>
                  • 주민등록번호는 아이케어에서 의료법시행령 제42조의2(민감정보
                  및 고유식별정보의 처리)에 근거하여 처리하고 있으며, 그 외
                  목적으로 처리 및 이용하고 있지 않습니다.
                </Text>
                <Text style={styles.modalText}>
                  • 회원님의 휴대폰에만 저장하며, 아이케어에서는 별도로 보관하지
                  않습니다.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.agreeButton}
                onPress={handleAgree}
              >
                <Text style={styles.agreeButtonText}>동의하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
    position: "relative"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 4
  },
  logo: {
    width: 48,
    height: 48
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
  inputWrapper: {
    padding: 20,
    marginTop: 40 // 상단 여백 추가
  },
  inputSection: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    color: "#016A4C",
    marginBottom: 8,
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#222222"
  },
  signUpButton: {
    backgroundColor: "#016A4C",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center"
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 260
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222"
  },
  closeButton: {
    padding: 4
  },
  modalBody: {
    marginBottom: 20
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16
  },
  agreeButton: {
    backgroundColor: "#016A4C",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20
  },
  agreeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  passwordInputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  passwordInput: {
    flex: 1
  },
  errorIcon: {
    position: "absolute",
    right: 12
  },
  errorText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  }
});
