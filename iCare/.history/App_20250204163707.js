import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Splash from "./components/Splash";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3초 후에 스플래시 화면 숨기기
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

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
