import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";

export default function Entry({ route, navigation }) {
  const idEvent = route.params.data._id;

  const [participant, setParticipant] = useState({
    event: {},
  });

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    const regex = /["]/g;
    const idParticipant = data.replace(regex, "");

    setScanned(true);

    services.getParticipantById(idParticipant).then((result) => {
      console.log("getParticipantId format objet", result);
      setParticipant(result);
    });

    if (idEvent === participant.event._id) {
      return alert("accès autorisé");
    }
    if (idEvent !== participant.event._id) {
      return alert("accès refusé");
    }
  };

  if (hasPermission === null) {
    return <Text>Requestion for camera persommission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCam}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.container}>
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Tap to scan again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerCam: {
    height: "80%",
    width: "80%",
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: "black",
    margin: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
