import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Contents from "./components/Contents";

const App = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />
        <Contents />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default App;
