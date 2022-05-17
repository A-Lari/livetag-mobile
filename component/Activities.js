import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";

export default function Activities({ route, navigation }) {
  const idActivity = route.params.idActivity;
  console.log("idActivity!:!:!:!:", idActivity);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [participant, setParticipant] = useState({
    event: {},
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const regex = /["]/g;
    const idParticipant = data.replace(regex, "");

    setScanned(true);

    const result = await services.getParticipantById(idParticipant);
    console.log("RESULT", result);
    setParticipant(result);

    console.log(
      "****************participant.event._id*************",
      result.event._id
    );

    const refActivities = result.role.activities;
    console.log("refActivities", refActivities);

    if (refActivities.includes(idActivity)) {
      console.log("confirmation");
      return navigation.navigate("AccessConfirm", {
        data,
      });
    } else {
      console.log("refusé");
      return navigation.navigate("AccessDenied");
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

  scanAgain: {
    flex: 1,
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
    backgroundColor: "rgb(19, 181, 230)",
    margin: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
