import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLS } from "./COLS";
import { FORMAT_background } from "./FORMAT_background";
import {
  FORMAT_containers,
  FORMAT_welcomeContainer,
  FORMAT_moreChoicesContainer,
} from "./FORMAT_containers";
import {
  FORMAT_switches,
  FORMAT_notes,
  FORMAT_todaysMeal,
  FORMAT_foodOptions,
  FORMAT_swipeBar,
  FORMAT_arrow,
  FORMAT_icons,
  FORMAT_mainRecipe,
} from "./FORMAT_extraComponents";
import { FORMAT_headings, FORMAT_textBoxHeading } from "./FORMAT_headings";
import { FORMAT_images } from "./FORMAT_images";
import { FORMAT_inputField } from "./FORMAT_inputField";
import { FORMAT_logo } from "./FORMAT_logo";
import {
  FORMAT_navButton,
  FORMAT_navButtonText,
  FORMAT_navButtonBackground,
} from "./FORMAT_navButton";
import { FORMAT_text, FORMAT_fonts } from "./FORMAT_text";

export default function HomeScreen({ navigation }) {
  // If no recipes in state, try to fetch from local storage. If none in local storage, fetch from database
  // Pass recipes to relevant screens
  // Save in local storage

  const [recipeList, setRecipeList] = useState([]);
  const [fetchPlease, setFetchPlease] = useState(true);

  const userID = 1;

  async function getLastRecipeDate() {
    const res = await fetch(
      `http://ec2-3-250-10-162.eu-west-1.compute.amazonaws.com:5000/users/${userID}`
    );
    const data = await res.json();
    return data.payload[0].last_date_meals_requested;
  }

  async function getTotalNoRecipes() {
    const res = await fetch(
      `http://ec2-3-250-10-162.eu-west-1.compute.amazonaws.com:5000/recipes?countOnly=true`
    );
    const data = await res.json();
    return data.payload.count;
  }

  // Get recipes
  useEffect(() => {
    async function runGetRecipes() {
      // Get userId TODO
      if (recipeList.length < 1) {
        // Get date of last recipes
        const last_date_meals_requested_temp = await getLastRecipeDate();
        const last_date_meals_requested = new Date(
          last_date_meals_requested_temp
        );
        const now = new Date();
        const timeDiffInDays =
          (now.getTime() - last_date_meals_requested.getTime()) /
          (1000 * 3600 * 24); // 1000*3600*24 = miliseconds in a day.
        if (timeDiffInDays > 6.5) {
          getNewRecipes();
          // TODO PATCH to set lastRecipeFetchDate to be now in database
        }
        // TODO Try to get from local storage
        // TODO If not in local storage, request again from database
      }
    }
    runGetRecipes();
  }, [fetchPlease]);

  // Get new recipes and load into state
  async function getNewRecipes() {
    let last_week_food = [];
    const res = await fetch(
      `http://ec2-3-250-10-162.eu-west-1.compute.amazonaws.com:5000/users/${userID}`
    );
    const data = await res.json();
    last_week_food = data.payload[0].last_weeks_meals
      .replace(/"|{|}/g, "")
      .split(",")
      .map((x) => +x);
    // Get total number of recipes
    const totalNumRecipes = (await getTotalNoRecipes()) || 50;
    // Get 14 random numbers with no duplicates
    const tempNumbers = [...Array(totalNumRecipes).keys()].map(
      (num) => num + 1
    );
    // Check that none of the recipes were in last weeks recipes by getting from database and checking
    last_week_food.forEach((x) => {
      const index = tempNumbers.indexOf(x);
      if (index > -1) {
        tempNumbers.splice(index, 1);
      }
    });
    tempNumbers.sort(() => Math.random() - 0.5);
    const randNums = tempNumbers.slice(0, 14);
    // Get the recipes from the database
    const fetchData = (URI) => {
      return fetch(URI)
        .then((response) => response.json())
        .then((data) => {
          return data.payload[0];
        });
    };
    const requests = [];
    randNums.forEach((num) => {
      requests.push(
        fetchData(
          `http://ec2-3-250-10-162.eu-west-1.compute.amazonaws.com:5000/recipes/${num}`
        )
      );
    });
    Promise.all(requests).then((arrayWithData) => {
      setRecipeList(arrayWithData);
    });
    // TODO send PATCH to set last_weeks_recipes to the current this_weeks_recipes
    // TODO sent PATCH request to set this_weeks_recipes to the newly generated recipes (currently in variable randNums)
    // Save recipes to local storage
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <View style={styles.logoCircle}>
          <Image source={require("../assets/images/Mealthings.png")} />
        </View>
        <Text style={styles.tagLine}>Eat Well. Feel Amazing.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonBackground}
          onPress={() => navigation.navigate("Register1")}
        >
          <Text style={styles.buttonText}>Try out now!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBackground}>
          <Text
            onPress={() => navigation.navigate("LoginPage")}
            style={styles.buttonText}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLS.C_BG,
    justifyContent: "center",
  },
  mealThingsLogo: {
    alignItems: "center",
    margin: "auto",
    justifyContent: "center",
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: COLS.C_LOGO_BG,
  },
  tagLine: {
    color: COLS.C5_LIGHT_TEXT,
  },
  buttonContainer: {
    marginTop: "20%",
  },
  buttonBackground: {
    backgroundColor: COLS.C5_LIGHT_TEXT,
    width: 200,
    alignSelf: "center",
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: COLS.C4_DARK_TEXT,
    textAlign: "center",
    padding: 5,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
