import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Header, Contents, FOoter } from "./components/Layout";
// import EventButton from "./components/EventButton";
// import EventInput from "./components/EventInput";

const App = () => {
  return (
    <View style={StyleSheet.container}>
      <Header>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 30
  }
});

export default App;
