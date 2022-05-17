import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import services from "../services";
import dayjs from "dayjs";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";

export default function Event({ route, navigation }) {
  const code = route.params.data.code;

  const [event, setEvent] = useState({});
  const [selectActivity, setSelectActivity] = useState();
  const [selectActivities, setSelectActivities] = useState([]);

  const fetchEventData = () => {
    services.getEventByCode(code).then((result) => {
      console.log("je suis fetchEventData", result);
      services.getActivitiesByEventId(result._id).then((activities) => {
        console.log("hello activities§§§§§§", activities);

        const selectNewActivities = [];

        activities.forEach((element) => {
          const item = {
            label: element.activity_name,
            value: element._id,
          };
          selectNewActivities.push(item);
        });
        console.log("!,!,!,!,!,!,selectNewActivities", selectNewActivities);

        setSelectActivities(selectNewActivities);
      });
      setEvent(result);
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: { value: "" },
  });

  function onSubmit(data) {
    console.log("onSubmit", data);
    navigation.navigate("Entry", { data: event });
  }

  const handleActivity = (idActivity) => {
    console.log("IDActivity &&& handleActivity", idActivity);
    setSelectActivity(idActivity);
  };

  useEffect(() => {
    fetchEventData();
  }, [code]);

  const placeholder = {
    label: "Selectionnez une activité...",
    value: null,
    color: "#9EA0A4",
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.homeLogo}
          source={require("../assets/logoQR.png")}
        ></Image>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>
          Bienvenue à {event.event_name}
        </Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>SCANNER ENTRÉE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerAction}>
        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={(value) => handleActivity(value)}
          items={selectActivities}
        />

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() =>
              navigation.navigate("Activities", { idActivity: selectActivity })
            }
          >
            SCANNER ACTIVITÉS
          </Text>
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
    marginTop: 30,
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
    marginTop: 10,
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
    backgroundColor: "rgb(19, 181, 230)",
    margin: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
