import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Activities({ route }) {
  console.log("je suis dans activities", route);
  return (
    <View style={styles.container}>
      <Text>Activities</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
