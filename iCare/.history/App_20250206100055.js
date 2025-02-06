import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Splash from "./components/Splash";
import HospitalList from "./components/HospitalList";
import PharmacyList from "./components/PharmacyList";
import MyPage from "./components/MyPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 임시 채팅, 마이페이지 컴포넌트
const ChatScreen = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <Header />
      <View style={styles.center}>
        <Text>채팅 화면</Text>
      </View>
    </View>
  </SafeAreaView>
);

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

// 탭 네비게이터
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
          paddingBottom: 20,
          paddingTop: 10,
          height: 80
        },
        tabBarActiveTintColor: "#016a4c",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarLabelStyle: {
          paddingBottom: 8,
          fontSize: 12,
          fontWeight: "500",
          marginTop: -4
        },
        tabBarIconStyle: {
          marginTop: -4
        }
      }}
    >
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat-bubble-outline" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="HospitalList" component={HospitalList} />
        <Stack.Screen name="PharmacyList" component={PharmacyList} />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 9,
    marginBottom: 9,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "green",
    fontFamily: "NotoSansKR"
  }
});

export default App;
