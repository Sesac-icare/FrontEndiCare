import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/HeaderGreenLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text style={[styles.buttonText, styles.loginText]}>로그인</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fff"
  },
  logo: {
    width: 48,
    height: 48
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#016A4C"
  },
  loginButton: {
    backgroundColor: "#016A4C",
  },
  buttonText: {
    fontSize: 16,
    color: "#016A4C",
    fontWeight: "600"
  },
  loginText: {
    color: "#fff"
  }
}); 