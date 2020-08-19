import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";

import { COLS } from "./COLS";
import {
  FORMAT_navButtonBackground,
  FORMAT_navButtonText,
} from "./FORMAT_navButton";
import { FORMAT_logo } from "./FORMAT_logo";
import { FORMAT_containers } from "./FORMAT_containers";
import { FORMAT_tagLine } from "./FORMAT_extraComponents";
import { FORMAT_navButton } from "./FORMAT_navButton";
import { FORMAT_inputField } from "./FORMAT_inputField";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLS.C6_WHITE_TEXT,
    justifyContent: "center",
    alignItems: FORMAT_containers.F_container_alignItems,
    margin: 0,
    width: "100%",
    height: "100%",
  },
  mealThingsLogo: {
    alignSelf: "center",
    marginTop: "40%",
  },
  buttonContainer: {
    marginTop: "10%",
  },
  buttonBackground: {
    width: vw(80),
    borderColor: COLS.C6_WHITE_TEXT,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: FORMAT_navButton.F_navButton_alignSelf,
    padding: 9,

    marginVertical: 10,
    height: "auto",
    width: FORMAT_inputField.F_inputField_width,
  },
  buttonText: {
    color: COLS.C4_DARK_TEXT,
    textAlign: FORMAT_navButtonText.F_navButtonText_textAlign,
    padding: FORMAT_navButtonText.F_navButtonText_padding,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
  },
});

export default function HomeScreen2({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/brooke-lark-wMzx2nBdeng-unsplash.jpg")}
        style={{
          zIndex: -1,
          flex: 1,
          width: vw(100),
          height: vh(100),
          resizeMode: "contain",
        }}
      >
        <View style={styles.welcomeContainer}>
          <View>
            <Image
              style={styles.mealThingsLogo}
              source={require("../assets/images/NewLogo1.png")}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBackground}
            onPress={() => navigation.navigate("Register1")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBackground}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

HomeScreen2.navigationOptions = {
  header: null,
};
