import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Contents() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleGreen}>사용자</Text>
          <Text style={styles.title}>님, 반가워요!</Text>
        </View>
        <Text style={styles.subtitle}>
          아이를 위한 24시간 병원 및 약국 찾기를 이용해보세요.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("HospitalList");
        }}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="#016a4c"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>병원 찾기</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#CCCCCC"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("약국 찾기 클릭됨");
        }}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="#016a4c"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>약국 찾기</Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color="#CCCCCC"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  titleWrapper: {
    marginBottom: 40
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "nowrap",
    alignItems: "center"
  },
  titleGreen: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#016a4c"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black"
  },
  subtitle: {
    fontSize: 16,
    color: "#999999"
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 89,
    width: "100%",
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  buttonIcon: {
    transform: [{ scale: 2 }],
    marginLeft: 20
  },
  buttonText: {
    fontSize: 18,
    color: "#016a4c",
    fontWeight: "900",
    flex: 1,
    textAlign: "center",
    marginLeft: -20
  },
  arrowIcon: {
    transform: [{ scale: 2 }],
    marginLeft: "auto",
    marginRight: 20
  }
});
