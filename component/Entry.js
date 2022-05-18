import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";
import { useIsFocused } from "@react-navigation/native";

export default function Entry({ route, navigation }) {
  const idEvent = route.params.data._id;
  const event = route.params.data;
  const [participant, setParticipant] = useState({
    event: {},
  });
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const regex = /["]/g;
    const idParticipant = data.replace(regex, "");

    const result = await services.getParticipantById(idParticipant);
    setParticipant(result);

    if (idEvent === result.event._id) {
      return navigation.navigate("AccessConfirm", {
        data,
      });
    } else {
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
        {isFocused ? (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        ) : null}
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
});
