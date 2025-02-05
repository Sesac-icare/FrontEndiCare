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

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("./assets/fonts/NotoSansKR-Regular.otf") // Ensure this path is correct
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자님, 반가워요!</Text>
      <Text style={styles.subtitle}>
        아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.
      </Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>병원 찾기</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>약국 찾기</Text>
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
    color: "green",
    marginBottom: 10,
    fontFamily: "NotoSansKR"
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    fontFamily: "NotoSansKR"
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
    color: "green",
    fontFamily: "NotoSansKR"
  }
});
