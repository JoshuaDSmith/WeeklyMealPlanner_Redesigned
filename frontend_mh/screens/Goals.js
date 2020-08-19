import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { vw, vh } from "react-native-expo-viewport-units";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import { COLS } from "./COLS";
import { FORMAT_images } from "./FORMAT_images";
import { FORMAT_inputField } from "./FORMAT_inputField";
import { FORMAT_navButton, FORMAT_navButtonText } from "./FORMAT_navButton";
const screenWidth = Dimensions.get("screen").width;
const iconSize = screenWidth * (1 / 5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "15%",
    padding: 20,
  },
  positioning: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  inputField: {
    padding: FORMAT_inputField.F_inputField_padding,
    marginVertical: FORMAT_inputField.F_inputField_marginVertical,
    width: FORMAT_inputField.F_inputField_width,
    alignSelf: FORMAT_inputField.F_inputField_alignSelf,
    alignItems: FORMAT_inputField.F_inputField_alignItems,
    height: FORMAT_inputField.F_inputField_height,
    borderRadius: FORMAT_inputField.F_inputField_borderRadius,
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
    color: COLS.C4_DARK_TEXT,
    shadowColor: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
  text: {
    color: COLS.C4_DARK_TEXT,
    textAlign: FORMAT_navButtonText.F_navButtonText_textAlign,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonText: {
    color: COLS.C4_DARK_TEXT,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    alignSelf: FORMAT_navButton.F_navButton_alignSelf,
    padding: FORMAT_navButton.F_navButton_padding,
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
    width: "40%",
  },
  buttonPosition: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  goals: {
    marginTop: "8%",
    marginBottom: "5%",
    color: COLS.C4_DARK_TEXT,
    fontSize: 16,
    fontWeight: "900",
  },
  firstRowIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondRowIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
});

export default function Goals({ navigation }) {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [fatLoss, setFatLoss] = useState(false);
  const [muscle, setMuscle] = useState(false);
  const [diet, setDiet] = useState(false);
  const [time, setTime] = useState(false);
  const [cook, setCook] = useState(false);
  function Track(enteredText) {
    setWeight(enteredText);
  }
  function Tracked(enteredText) {
    setHeight(enteredText);
  }
  function handleSubmit() {
    var goals = "";
    if (fatLoss) {
      goals += "Fat loss,";
    }
    if (muscle) {
      goals += ",Muscle gain";
    }
    if (diet) {
      goals += ",No diet";
    }
    if (time) {
      goals += ",Save time";
    }
    if (cook) {
      goals += ",Learn to cook";
    }
    const data = { height, weight, goals };
    console.log("data in goals", data);
    navigation.navigate("Allergies", { data });
  }
  function fatHandler() {
    if (diet === true) {
      setFatLoss(false);
    } else if (fatLoss === false) {
      setFatLoss(true);
    } else if (fatLoss === true) {
      setFatLoss(false);
    }
  }
  function muscleHandler() {
    if (muscle === false) {
      setMuscle(true);
    } else if (muscle === true) {
      setMuscle(false);
    }
  }
  function dietHandler() {
    if (diet === false) {
      setDiet(true);
      setFatLoss(false);
      setMuscle(false);
    } else if (diet === true) {
      setDiet(false);
    }
  }
  function timeHandler() {
    if (time === false) {
      setTime(true);
    } else if (time === true) {
      setTime(false);
    }
  }
  function cookHandler() {
    if (cook === false) {
      setCook(true);
    } else if (cook === true) {
      setCook(false);
    }
  }

  return (
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View>
            <Text
              style={{
                color: COLS.C4_DARK_TEXT,
                fontSize: 16,
                fontWeight: "900",
                marginBottom: 10,
              }}
            >
              Tell us about yourself...
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.inputField}
              placeholder="Weight (kg)"
              placeholderTextColor={COLS.C4_DARK_TEXT}
              onChangeText={Track}
              maxLength={3}
            ></TextInput>
            <TextInput
              keyboardType="number-pad"
              style={styles.inputField}
              placeholder="Height (cm)"
              placeholderTextColor={COLS.C4_DARK_TEXT}
              type="number"
              onChangeText={Tracked}
              maxLength={3}
            ></TextInput>
            <View>
              <Text style={styles.goals}>...and what are your Goals?</Text>
            </View>
            <View style={styles.firstRowIcons}>
              <View style={styles.positioning}>
                <TouchableOpacity onPress={fatHandler}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={iconSize}
                    color={fatLoss ? COLS.C_RED : COLS.C6_WHITE_TEXT}
                  />
                  <Text style={styles.text}>Fat Loss</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.positioning}>
                <TouchableOpacity onPress={muscleHandler}>
                  <FontAwesome5
                    name="weight-hanging"
                    size={iconSize * 0.9}
                    color={muscle ? COLS.C_RED : COLS.C6_WHITE_TEXT}
                    style={{ left: "10%", marginBottom: "10%" }}
                  />
                  <Text style={styles.text}>Gaining Muscle</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.positioning}>
                <TouchableOpacity onPress={dietHandler}>
                  <MaterialCommunityIcons
                    name="food-croissant"
                    size={iconSize}
                    color={diet ? COLS.C_RED : COLS.C6_WHITE_TEXT}
                  />
                  <Text style={styles.text}>No Diet</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.secondRowIcons}>
              <View style={styles.secondLastIcon}>
                <View style={styles.positioning}>
                  <TouchableOpacity onPress={timeHandler}>
                    <MaterialCommunityIcons
                      name="clock"
                      size={iconSize}
                      color={time ? COLS.C_RED : COLS.C6_WHITE_TEXT}
                    />
                    <Text style={styles.text}>Saving Time</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.lastIcon}>
                <View style={styles.positioning}>
                  <TouchableOpacity onPress={cookHandler}>
                    <MaterialCommunityIcons
                      name="chef-hat"
                      size={iconSize}
                      style={{ right: "18%" }}
                      color={cook ? COLS.C_RED : COLS.C6_WHITE_TEXT}
                    />
                    <Text style={styles.text}>Learning to Cook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttonPosition}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
