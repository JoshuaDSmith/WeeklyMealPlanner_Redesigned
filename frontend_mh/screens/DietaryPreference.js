import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ImageBackground,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { AuthContext } from "../App.js";
import { ScrollView } from "react-native-gesture-handler";
import { COLS } from "./COLS";
import { FORMAT_containers } from "./FORMAT_containers";
import { FORMAT_switches } from "./FORMAT_extraComponents";
import { FORMAT_headings } from "./FORMAT_headings";
import { FORMAT_navButton } from "./FORMAT_navButton";
import { FORMAT_text, FORMAT_fonts } from "./FORMAT_text";
import { FORMAT_navButtonText } from "./FORMAT_navButton";

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: FORMAT_containers.F_container_padding,
    alignItems: FORMAT_containers.F_container_alignItems,
    justifyContent: FORMAT_containers.F_container_justifyContent,
    flex: FORMAT_containers.F_container_flex,
  },
  text: {
    alignSelf: FORMAT_text.F_text_alignSelf,
    marginBottom: FORMAT_text.F_text_marginBottom,
    marginTop: FORMAT_text.F_text_marginTop,
    margin: FORMAT_text.F_text_margin,
    fontWeight: FORMAT_fonts.F_font_fontWeight,
    color: COLS.C4_DARK_TEXT,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
  },
  switch: {
    right: FORMAT_switches.F_switch_right,
    bottom: FORMAT_switches.F_switch_bottom,
  },
  button_Direction: {
    flexDirection: FORMAT_navButton.F_navButton_flexDirection,
  },
  buttons: {
    alignSelf: FORMAT_navButton.F_navButton_alignSelf,
    padding: FORMAT_navButton.F_navButton_padding,
    borderRadius: FORMAT_navButton.F_navButton_borderRadius,
    margin: 20,
    borderWidth: 2,
    borderColor: COLS.C6_WHITE_TEXT,
    width: "40%",
  },
  heading: {
    alignSelf: FORMAT_headings.F_heading_alignSelfF_heading_alignSelf,
    left: FORMAT_headings.F_headingMainTitle_left,
    fontSize: FORMAT_headings.F_headingMainTitle_fontSize,
    fontWeight: "500",
    bottom: FORMAT_headings.F_headingMainTitle_bottom,
    marginBottom: FORMAT_headings.F_headingMainTitle_marginBottom,
    marginTop: FORMAT_headings.F_headingMainTitle_marginTop,
    color: COLS.C4_DARK_TEXT,
  },
  buttontext: {
    color: COLS.C4_DARK_TEXT,
    fontSize: FORMAT_navButtonText.F_navButtonText_fontSize,
    fontWeight: "500",
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginLeft: "3%",
  },
  header: {
    marginTop: 20,
    color: COLS.C4_DARK_TEXT,
    textAlign: FORMAT_navButtonText.F_navButtonText_textAlign,
    fontSize: 28,
    fontWeight: "500",
  },
});

export default function Preferences({ navigation, route }) {
  const { userID } = useContext(AuthContext);
  const { data } = route.params;
  const [noRequirement, setNoRequirement] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [ovovegetarian, setOvovegetarian] = useState(false);
  const [lactoVegetarian, setlactoVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);

  function noRequirementHandler() {
    if (noRequirement === true) {
      setNoRequirement(false);
    } else {
      setNoRequirement(true);
      setVegetarian(false);
      setOvovegetarian(false);
      setlactoVegetarian(false);
      setVegan(false);
    }
  }

  function vegetarianHandler() {
    if (vegetarian === true) {
      setVegetarian(false);
    } else {
      setNoRequirement(false);
      setVegetarian(true);
      setOvovegetarian(false);
      setlactoVegetarian(false);
      setVegan(false);
    }
  }

  function ovovegetarianHandler() {
    if (ovovegetarian === true) {
      setOvovegetarian(false);
    } else {
      setNoRequirement(false);
      setVegetarian(false);
      setOvovegetarian(true);
      setlactoVegetarian(false);
      setVegan(false);
    }
  }

  function lactoHander() {
    if (lactoVegetarian === true) {
      setlactoVegetarian(false);
    } else {
      setNoRequirement(false);
      setVegetarian(false);
      setOvovegetarian(false);
      setlactoVegetarian(true);
      setVegan(false);
    }
  }

  function veganHandler() {
    if (vegan === true) {
      setVegan(false);
    } else {
      setNoRequirement(false);
      setVegetarian(false);
      setOvovegetarian(false);
      setlactoVegetarian(false);
      setVegan(true);
    }
  }

  function postHandler() {
    var food_prefs_inc = "";
    if (vegetarian) {
      food_prefs_inc = "vegetarian";
    } else if (ovovegetarian) {
      food_prefs_inc = "ovovegetarian";
    } else if (lactoVegetarian) {
      food_prefs_inc = "lactoVegetarian";
    } else if (vegan) {
      food_prefs_inc = "vegan";
    } else {
      food_prefs_inc = "noRequirement";
    }
    data["food_prefs_inc"] = food_prefs_inc;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
    fetch(
      `http://ec2-3-250-10-162.eu-west-1.compute.amazonaws.com:5000/users/${userID}`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Return from DietaryPreferences:", data);
      })
      .catch((err) => {
        console.warn(err);
      });
    console.log("final data in dietary prefs", data);
    navigation.navigate("LandingPage");
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
      <ScrollView style={styles.background}>
        <Text style={styles.header}> Diet Preferences</Text>
        <View style={styles.container}>
          <Text style={styles.text}> No Requirement</Text>
          <Text style={styles.subheading}> I'll Eat It All!</Text>
          <Switch
            style={styles.switch}
            trackColor={{ true: "#57DD39" }}
            thumbColor={COLS.C6_WHITE_TEXT}
            ios_backgroundColor={COLS.C4_DARK_TEXT}
            onValueChange={noRequirementHandler}
            value={noRequirement}
          />
          <Text style={styles.text}> Vegetarian</Text>
          <Text style={styles.subheading}>No to meat & fish.</Text>
          <Switch
            style={styles.switch}
            trackColor={{ true: "#57DD39" }}
            thumbColor={COLS.C6_WHITE_TEXT}
            ios_backgroundColor={COLS.C4_DARK_TEXT}
            onValueChange={vegetarianHandler}
            value={vegetarian}
          />
          <Text style={styles.text}> Ovo-Vegetarian </Text>
          <Text style={styles.subheading}>No to diary, meat & fish.</Text>

          <Switch
            style={styles.switch}
            trackColor={{ true: "#57DD39" }}
            thumbColor={COLS.C6_WHITE_TEXT}
            ios_backgroundColor={COLS.C4_DARK_TEXT}
            onValueChange={ovovegetarianHandler}
            value={ovovegetarian}
          />
          <Text style={styles.text}> Lacto-vegetarian</Text>
          <Text style={styles.subheading}>No to eggs, meat & fish.</Text>

          <Switch
            style={styles.switch}
            trackColor={{ true: "#57DD39" }}
            thumbColor={COLS.C6_WHITE_TEXT}
            ios_backgroundColor={COLS.C4_DARK_TEXT}
            onValueChange={lactoHander}
            value={lactoVegetarian}
          />
          <Text style={styles.text}> Vegan</Text>
          <Text style={styles.subheading}>All Hail Plant Power!</Text>

          <Switch
            style={styles.switch}
            trackColor={{ true: "#57DD39" }}
            thumbColor={COLS.C6_WHITE_TEXT}
            onValueChange={veganHandler}
            value={vegan}
          />
          <View style={styles.button_Direction}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttontext}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={postHandler}>
              <Text style={styles.buttontext}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
