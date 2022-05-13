import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import services from "../services";
import dayjs from "dayjs";

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
        <Text>Nom : {event.event_name}</Text>
        <Text style={styles.containerComment}>Code : {event.code}</Text>
        <Text style={styles.containerComment}>{event.description}</Text>
        <Text style={styles.containerComment}>
          Début :{dayjs(event.start_date).format("DD.MM.YYYY")}
        </Text>
        <Text style={styles.containerComment}>
          Fin :{dayjs(event.end_date).format("DD.MM.YYYY")}
        </Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>Vous souhaitez?</Text>
        <Text>Merci de sélectionner quel scanner vous souhaitez utiliser</Text>
      </View>

      <View style={styles.containerAction}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Scanner l'entrée</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerAction}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Scanner l'activité</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
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

  containerAction: {
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: "black",
    margin: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
