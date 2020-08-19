import React, { useState, useContext } from "react";
import { AuthContext } from "../App.js";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { COLS } from "./COLS";
import { vw, vh } from "react-native-expo-viewport-units";

import { FORMAT_welcomeContainer } from "./FORMAT_containers";
import { FORMAT_inputField } from "./FORMAT_inputField";
import { FORMAT_logo } from "./FORMAT_logo";
import { FORMAT_navButton, FORMAT_navButtonText } from "./FORMAT_navButton";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLS.C6_WHITE_TEXT,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    alignItems: FORMAT_welcomeContainer.F_welcomeContainer_alignItems,
    marginTop: FORMAT_welcomeContainer.F_welcomeContainer_marginTop,
    marginBottom: -40,
  },
  mealThingsLogo: {
    alignSelf: "center",
    marginTop: "40%",
  },
  inputField: {
    padding: FORMAT_inputField.F_inputField_padding,
    marginVertical: FORMAT_inputField.F_inputField_marginVertical,
    width: FORMAT_inputField.F_inputField_width,
    alignSelf: FORMAT_inputField.F_inputField_alignSelf,

    height: FORMAT_inputField.F_inputField_height,
    borderRadius: FORMAT_inputField.F_inputField_borderRadius,
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
    color: COLS.C4_DARK_TEXT,
    fontWeight: "200",
    fontSize: 16,
  },
  button: {
    alignSelf: FORMAT_navButton.F_navButton_alignSelf,
    padding: 9,
    borderColor: COLS.C6_WHITE_TEXT,
    borderWidth: 2,
    borderRadius: FORMAT_navButton.F_navButton_borderRadius,
    marginVertical: 20,

    width: FORMAT_inputField.F_inputField_width,
  },
  buttonText: {
    color: "black",
    textAlign: FORMAT_navButtonText.F_navButtonText_textAlign,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
    fontSize: 16,
  },
});

export default function Loginpage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { logIn } = useContext(AuthContext);

  function handleEmailChange(enteredText) {
    setEmail(enteredText);
  }
  function handlePasswordChange(enteredText) {
    setPassword(enteredText);
  }

  function handleSubmit() {
    logIn(email, password);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              value={email}
              autoCompleteType={"email"}
              keyboardType="email-address"
              onChangeText={handleEmailChange}
              placeholderTextColor={COLS.C4_DARK_TEXT}
            />
            <TextInput
              style={styles.inputField}
              placeholder=" Password"
              value={password}
              autoCompleteType={"password"}
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              placeholderTextColor={COLS.C4_DARK_TEXT}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
