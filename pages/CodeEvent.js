import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";

export default function CodeEvent({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: { value: "" },
  });

  function onSubmit(data) {
    navigation.navigate("Evènement", { data });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.homeLogo}
          source={require("../assets/logoQR.png")}
        ></Image>
      </View>

      <View style={styles.containerText}>
        <Text>
          Renseignez votre code évènement pour commencer à scanner vos
          participants
        </Text>
      </View>

      <View style={styles.containerInput}>
        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Saisissez votre code"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.containerAction}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  containerLogo: {
    width: "80%",
    height: "10%",
  },

  homeLogo: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },

  containerText: {
    margin: 5,
    width: "70%",
  },

  containerInput: {
    margin: 5,
    width: "70%",
  },

  input: {
    backgroundColor: "lightgray",
    height: 50,
    borderRadius: 10,
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: " rgb(1, 80, 104)",
    margin: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
