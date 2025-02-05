import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// 스플래시 스크린 유지
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    // 임시로 시스템 폰트를 사용하거나, 폰트 로딩을 제거
    // NotoSansKR: require("./assets/fonts/NotoSansKR-Regular.otf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.titleGreen,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          사용자
        </Text>
        <Text
          style={[
            styles.title,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          님, 반가워요!
        </Text>
      </View>
      <Text
        style={[
          styles.subtitle,
          { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
        ]}
      >
        아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("병원 찾기 클릭됨");
        }}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="#016a4c"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonText,
              { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
            ]}
          >
            병원 찾기
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#CCCCCC"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("약국 찾기 클릭됨");
        }}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="#016a4c"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonText,
              { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
            ]}
          >
            약국 찾기
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#CCCCCC"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  titleContainer: {
    flexDirection: "row"
  },
  titleGreen: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#999999",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#fff",
    padding: 35,
    width: "100%",
    borderRadius: 10,
    marginBottom: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonIcon: {
    fontSize: 32,
    marginRight: 12
  },
  arrowIcon: {
    fontSize: 32,
    marginLeft: "auto",
    color: "#CCCCCC"
  },
  buttonText: {
    fontSize: 16,
    color: "#016a4c",
    fontFamily: "NotoSansKR",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  }
});
