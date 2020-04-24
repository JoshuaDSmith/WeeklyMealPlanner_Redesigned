import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLS } from "./COLS";
import { FORMAT_background } from "./FORMAT_background";
import {
  FORMAT_containers,
  FORMAT_welcomeContainer,
  FORMAT_moreChoicesContainer
} from "./FORMAT_containers";
import {
  FORMAT_switches,
  FORMAT_notes,
  FORMAT_todaysMeal,
  FORMAT_foodOptions,
  FORMAT_swipeBar,
  FORMAT_arrow,
  FORMAT_icons,
  FORMAT_mainRecipe
} from "./FORMAT_extraComponents";
import { FORMAT_headings, FORMAT_textBoxHeading } from "./FORMAT_headings";
import { FORMAT_images } from "./FORMAT_images";
import { FORMAT_inputField } from "./FORMAT_inputField";
import { FORMAT_logo } from "./FORMAT_logo";
import {
  FORMAT_navButton,
  FORMAT_navButtonText,
  FORMAT_navButtonBackground
} from "./FORMAT_navButton";
import { FORMAT_text, FORMAT_fonts } from "./FORMAT_text";

const multipleRecipes = [
  {
    recipe_id: "1",
    name: "Really Delicious Cabbage",
    ingredients: ["Cabbage", "Butter", "Caraway seeds"],
    ingredientsQuantities: ["1 head", "100 g", "1 tsp"],
    calories: "286",
    protein: "20",
    carbohydrates: "160",
    fat: "15",
    cooking_difficulty: "1",
    cooking_time_mins: "25",
    method: [
      "Roughly chop the cabbage",
      "Add to steamer and add half a tsp of caraway seeds",
      "Steam for approx. 5 min (depending on cabbage type) until cooked but still crunchy",
      "Remove from heat and drain. ",
      "Add the butter and gently stir cabbage until butter melts",
      "Serve immediatly with remaining caraway seeds and several grinds of black pepper"
    ]
  },
  {
    recipe_id: "2",
    name: "Really Delicious BLT",
    ingredients: [
      "Free range streaky bacon",
      "Lettuce",
      "Beef tomato",
      "Wholemeal bread",
      "Freshly churned butter",
      "Mayonaise"
    ],
    ingredientsQuantities: [
      "2 rashers",
      "Several leaves",
      "1",
      "2 slices",
      "",
      ""
    ],
    calories: "286",
    protein: "20",
    carbohydrates: "160",
    fat: "15",
    cooking_difficulty: "1",
    cooking_time_mins: "25",
    method: [
      "Slice the bread thickly",
      "Spread the freshly churned butter on one slice of bread.",
      "Spread mayonaise on the second slice of bread",
      "Slice the tomato thinly",
      "Fry the bacon until crispy",
      "Tear the lettuce roughly by hand",
      "layer the tomato slices, lettuce and bacon on the bread and serve as a sandwhich."
    ]
  },
  {
    recipe_id: "3",
    name: "Really Delicious Porrige",
    ingredients: ["Porrige", "Blueberries", "Banana", "Oat milk"],
    ingredientsQuantities: ["100 g", "1 handful", "1 sliced", "200 ml"],
    calories: "286",
    protein: "20",
    carbohydrates: "160",
    fat: "15",
    cooking_difficulty: "1",
    cooking_time_mins: "25",
    method: [
      "Mix ingredients in a saucepan",
      "Heat ingredients over a low heat, stirring gently until milk is fully absorbed",
      "Serve while hot"
    ]
  }
];

function IngredientItem({ item }) {
  const [bought, setBought] = useState(false);
  return (
    <TouchableOpacity onPress={() => setBought(!bought)} key={item}>
      <View style={styles.ingredientItemContainer}>
        <View style={bought ? styles.circleChecked : styles.circle}></View>
        <Text style={bought ? styles.itemTextChecked : styles.itemText}>
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ShoppingList({ navigation }) {
  const listOfIngredients = [];
  multipleRecipes.forEach(recipe => {
    recipe.ingredients.forEach(item => {
      listOfIngredients.push(item);
    });
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.position}
        onPress={() => {
          navigation.navigate("LandingPage");
        }}
      >
        <Image
          style={styles.arrow}
          source={require("../assets/images/goback.png")}
        />
      </TouchableOpacity>
      <ScrollView>
        {listOfIngredients.map(item => (
          <IngredientItem item={item} />
        ))}
      </ScrollView>

      <View>
        <TouchableOpacity
          style={styles.formatting}
          onPress={() => navigation.navigate("TodaysRecipe")}
        >
          <Text> Start Cooking </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLS.C_BG,
    padding: 5
  },

  arrow: {
    height: 30,
    width: 30,
    left: 10,
    top: 20,
    marginBottom: 40
  },
  formatting: {
    backgroundColor: COLS.C5_LIGHT_TEXT,
    marginBottom: 20,
    padding: 20,
    alignItems: "center"
  },
  ingredientItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10
  },
  circle: {
    marginRight: 10,
    height: 25,
    width: 25,
    borderRadius: 25,
    borderColor: COLS.C4_DARK_TEXT,
    borderStyle: "solid",
    borderWidth: 3
  },
  circleChecked: {
    marginRight: 10,
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: COLS.C3_LIGHT_TEXT,
    borderColor: COLS.C3_LIGHT_TEXT,
    borderStyle: "solid",
    borderWidth: 3
  },
  itemTextChecked: {
    fontSize: 18,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: COLS.C5_LIGHT_TEXT
  },
  itemText: {
    fontSize: 18,
    color: COLS.C4_DARK_TEXT
  }
});
