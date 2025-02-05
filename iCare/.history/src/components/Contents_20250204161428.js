import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Contents() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.titleGreen,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          사용자
        </Text>
        <Text
          style={[
            styles.title,
            { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
          ]}
        >
          님, 반가워요!
        </Text>
      </View>
      <Text
        style={[
          styles.subtitle,
          { fontFamily: Platform.OS === "ios" ? "System" : "Roboto" }
        ]}
      >
        아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("병원 찾기 클릭됨");
        }}
      >
        {/* ... 병원 찾기 버튼 내용 ... */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("약국 찾기 클릭됨");
        }}
      >
        {/* ... 약국 찾기 버튼 내용 ... */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... 기존 스타일들 ...
}); 