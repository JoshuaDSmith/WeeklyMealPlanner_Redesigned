import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { COLS } from "./COLS";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
    justifyContent: "space-around",
    backgroundColor: COLS.C_BG,
    flex: 1,
  },
  mealThingsLogo: {
    height: screenWidth * 0.8,
    width: screenWidth * 0.8,
  },

  textRect: {
    backgroundColor: COLS.C5_LIGHT_TEXT,
    width: "50%",
    padding: 15,
    margin: 5,
  },
  text: {
    textAlign: "center",
  },
  icon: { textAlign: "center", alignSelf: "center" },
});

export default function SplashLoad() {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Image
          style={styles.mealThingsLogo}
          source={require("../assets/images/NewLogo1.png")}
        />
      </View>
      <View style={styles.textRect}>
        <Text style={styles.text}>
          Loading - we're spinning up your meal for you, so you don't have to!
        </Text>
      </View>
    </View>
  );
}
