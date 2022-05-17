import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConfirmEventAccess() {
  return (
    <View style={styles.container}>
      <Ionicons name="md-close-circle" size={100} color="red" />
      <View style={styles.AccessDenied}>
        <Text style={styles.AccessDeniedText}>Refusé</Text>
      </View>
      <View styles={styles.infos}>
        <Text style={styles.containerTitle}>Participant non inscrit</Text>
        <Text style={styles.containerTitle}>Accès non autorisé</Text>
      </View>
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

  AccessDenied: {
    textAlign: "center",
    justifyContent: "center",
    height: 150,
    width: 300,
    borderRadius: 10,
    backgroundColor: "red",
    marginBottom: 100,
  },
  AccessDeniedText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    justifyContent: "center",
    textAlign: "center",
  },

  infos: {
    flex: 1,
  },
});
