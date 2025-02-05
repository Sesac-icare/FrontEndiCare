import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Contents />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  }
});

export default App;
