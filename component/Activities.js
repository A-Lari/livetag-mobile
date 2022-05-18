import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";
import { useIsFocused } from "@react-navigation/native";

export default function Activities({ route, navigation }) {
  const idActivity = route.params.idActivity;

  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();

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

    const result = await services.getParticipantById(idParticipant);
    setParticipant(result);

    const refActivities = result.role.activities;

    if (refActivities.includes(idActivity)) {
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
