import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();

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
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text style={styles.signUpButtonText}>회원가입</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: 42,
    height: 42
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 32
  },
  inputWrapper: {
    padding: 20,
    marginTop: 40  // 상단 여백 추가
  },
  inputSection: {
    marginBottom: 28
  },
  label: {
    fontSize: 15,
    color: "#016A4C",
    marginBottom: 10,
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#222222",
    backgroundColor: "#fff"
  },
  signUpButton: {
    backgroundColor: "#016A4C",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    marginBottom: 40,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  }
}); 