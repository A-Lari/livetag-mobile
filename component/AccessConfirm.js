import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import services from "../services";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmEventAccess({ route, navigation }) {
  const regex = /["]/g;
  const idParticipant = route.params.data.replace(regex, "");

  console.log("confirm event access ***", idParticipant);

  const [participant, setParticipant] = useState({
    event: {},
  });

  const fetchParticipantData = () => {
    services.getParticipantById(idParticipant).then((result) => {
      console.log("je suis fetchParticipantData", result);
      setParticipant(result);
    });
  };

  useEffect(() => {
    fetchParticipantData();
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={100} color="green" />

      <View style={styles.confirmAccess}>
        <Text style={styles.confirmAccessText}>Confirmé</Text>
      </View>
      <View styles={styles.infos}>
        <Text style={styles.containerTitle}>Id du participant</Text>
        <Text style={styles.containerText}>Nom :</Text>
        <Text style={styles.containerData}> {participant.lastname}</Text>
        <Text style={styles.containerText}>Prénom :</Text>
        <Text style={styles.containerData}> {participant.firstname}</Text>
      </View>
      <View>
        <Text style={styles.containerTitle}>Rôle du participant</Text>
        <Text style={styles.containerData}>{participant?.role?.role_name}</Text>
      </View>
      {/* <View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() =>
              navigation.navigate("Entry", { data: participant.event._id })
            }
          >
            Retour
          </Text>
        </TouchableOpacity>
      </View> */}
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

  confirmAccess: {
    textAlign: "center",
    justifyContent: "center",
    height: 150,
    width: 300,
    borderRadius: 10,
    backgroundColor: "green",
    marginBottom: 60,
  },
  confirmAccessText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },

  infos: {
    flex: 1,
  },

  containerText: {
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  containerData: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  // button: {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 30,
  //   paddingRight: 30,
  //   borderRadius: 10,
  //   margin: 5,
  //   backgroundColor: "rgb(19, 181, 230)",
  // },

  // buttonText: {
  //   color: "white",
  //   fontWeight: "bold",
  // },
});
