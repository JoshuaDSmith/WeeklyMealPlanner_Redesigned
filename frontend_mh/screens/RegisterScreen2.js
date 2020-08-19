import React, { useState, useContext } from "react";
import { AuthContext } from "../App.js";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { COLS } from "./COLS";
import { FORMAT_navButtonText } from "./FORMAT_navButton";
import { vw, vh } from "react-native-expo-viewport-units";
const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    color: COLS.C4_DARK_TEXT,
    fontSize: 24,
    padding: 10,
    alignSelf: "center",
  },
  inputField: {
    padding: 10,
    fontSize: 16,
    marginVertical: 5,
    color: COLS.C4_DARK_TEXT,
    width: 200,
    alignSelf: "center",
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
  },
  buttonFlex: {
    alignSelf: "center",
    width: screenWidth * 0.7,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 0,
    padding: 10,
  },
  buttonText: {
    width: 80,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
  },
  textStyle: {
    color: COLS.C4_DARK_TEXT,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
    fontSize: 16,
  },
});

export default function Registerscreen2({ navigation, route }) {
  const { data } = route.params;
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const { register } = useContext(AuthContext);

  function emailChangeHandler(enteredText) {
    setEmailAddress(enteredText);
  }

  function passwordHandler(enteredText) {
    setPassword(enteredText);
  }

  async function SubmitHandler() {
    console.log(emailAddress, password);
    if (
      !/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(emailAddress) ||
      !emailAddress
    ) {
      Alert.alert("Please check email is correct and resubmit");
    } else if (!password || password.length < 2) {
      Alert.alert("Password must be longer than 2 characters long!");
    } else {
      const dataPlus = { ...data, password, email_address: emailAddress };
      register(dataPlus);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <View style={styles.container}>
          <Text style={styles.title}>Register Email & Password:</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={emailChangeHandler}
            placeholder="Email address"
            placeholderTextColor={COLS.C4_DARK_TEXT}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            autoCompleteType={"password"}
            secureTextEntry={true}
            onChangeText={passwordHandler}
            placeholderTextColor={COLS.C4_DARK_TEXT}
          />
          <View style={styles.buttonFlex}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonText}
            >
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={SubmitHandler} style={styles.buttonText}>
              <Text style={styles.textStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
