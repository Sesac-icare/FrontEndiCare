import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Splash from "./components/Splash";
import HospitalList from "./components/HospitalList";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />
        <Contents />
      </View>
    </SafeAreaView>
  );
};

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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HospitalList" component={HospitalList} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 9,
    marginBottom: 9,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "green",
    fontFamily: 'NotoSansKR',
  },
});

export default App;
