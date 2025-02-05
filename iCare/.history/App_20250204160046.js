// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
//__________________________________________________________
// import App from "./src/App";
// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import {Text} from 'react-native';

// export default function App() {
//   return (
//     <>
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//     </>
//   );
// }

// export default App;

import React, { useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
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
      <Text
        style={[
          styles.title,
          { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
        ]}
      >
        사용자님, 반가워요!
      </Text>
      <Text
        style={[
          styles.subtitle,
          { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
        ]}
      >
        아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.
      </Text>
      <View style={styles.button}>
        <Text
          style={[
            styles.buttonText,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          병원 찾기
        </Text>
      </View>
      <View style={styles.button}>
        <Text
          style={[
            styles.buttonText,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          약국 찾기
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10
    // fontFamily: "NotoSansKR" // 주석 처리
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20
    // fontFamily: "NotoSansKR" // 주석 처리
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "green"
    // fontFamily: "NotoSansKR" // 주석 처리
  }
});
