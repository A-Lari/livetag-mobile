import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./component/MyTabs";
import Entry from "./component/Entry";
import Activities from "./component/Activities";
import AccessConfirm from "./component/AccessConfirm";
import AccessDenied from "./component/AccessDenied";
import Event from "./pages/Event";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyTabs"
          component={MyTabs}
        />
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Event" component={Event} />

        <Stack.Screen
          name="AccessConfirm"
          component={AccessConfirm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccessDenied"
          component={AccessDenied}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
