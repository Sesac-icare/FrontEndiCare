import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Contents from "./components/Contents";

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Contents />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default App;
