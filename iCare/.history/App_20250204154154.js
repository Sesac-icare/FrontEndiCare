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

export default function App() {
  return (
    <View style={
       
    }>
      <Text>사용자님, 반가워요!</Text>
      <Text>아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
