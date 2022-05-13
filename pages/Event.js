import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import services from "../services";

export default function Event({ route }) {
  const code = route.params.data.code;

  const [event, setEvent] = useState({});

  // const fetchEventData = async () => {
  //   console.log("fetch", code);
  //   const result = await services.getEventByCode(code);
  //   setEvent(result);
  //   console.log("fetchEvent", result);
  // };

  const fetchEventData = () => {
    services.getEventByCode(code).then((result) => {
      console.log("je suis fetchEventData", result);
      setEvent(result);
    });
  };

  useEffect(() => {
    fetchEventData();
  }, [code]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.homeLogo}
          source={require("../assets/logoQR.png")}
        ></Image>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>Bienvenue sur l'évènement</Text>
        <Text>nom de l'event : {event.event_name}</Text>
        <Text style={styles.containerComment}>numéro code</Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>Vous souhaitez?</Text>
        <Text>Merci de sélectionner le scanner entrée ou activité</Text>
        <Text style={styles.containerComment}>Voir menu en bas de l'écran</Text>
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

  containerLogo: {
    width: "70%",
    height: "10%",
  },

  homeLogo: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },

  containerText: {
    marginTop: 30,
    width: "70%",
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },

  containerComment: {
    fontStyle: "italic",
    marginTop: 5,
  },
});
