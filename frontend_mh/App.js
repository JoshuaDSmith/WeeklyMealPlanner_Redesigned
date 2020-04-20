import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import HomeScreen from "./screens/HomeScreen";

import Goals from "./screens/Goals";

import ShoppingList from "./screens/ShoppingList";
import NewRecipe from "./screens/NewRecipe";
import TodaysRecipe from "./screens/TodaysRecipe";
import YourStats from "./screens/YourStats";
import SplashScreenDrink from "./screens/SplashScreenDrink";
import SplashScreenExerciseSlow from "./screens/SplashScreenExerciseSlow";
import SplashScreenExerciseQuick from "./screens/SplashScreenExerciseQuick";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="YourStats"
              component={YourStats}
              options={{ title: "Your stats" }}
            />
            <Stack.Screen
              name="Goals"
              component={Goals}
              options={{ title: "Goals" }}
            />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingList}
              options={{ title: "Shopping List" }}
            />
            <Stack.Screen
              name="NewRecipe"
              component={NewRecipe}
              options={{ title: "Add a new recipe" }}
            />
            <Stack.Screen
              name="TodaysRecipe"
              component={TodaysRecipe}
              options={{ title: "Today's recipe" }}
            />
            <Stack.Screen
              name="SplashScreenDrink"
              component={SplashScreenDrink}
              options={{ title: "Alert" }}
            />
            <Stack.Screen
              name="SplashScreenExerciseSlow"
              component={SplashScreenExerciseSlow}
              options={{ title: "Alert" }}
            />
            <Stack.Screen
              name="SplashScreenExerciseQuick"
              component={SplashScreenExerciseQuick}
              options={{ title: "Alert" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
