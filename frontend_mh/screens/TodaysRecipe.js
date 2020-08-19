import React, { useState, useContext } from "react";
import { AuthContext } from "../App.js";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { COLS } from "./COLS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  pageTitle: {
    top: "38.1%",
    position: "absolute",
    padding: 5,
    textAlign: "center",
    fontSize: 24,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

    color: COLS.C4_DARK_TEXT,
    fontWeight: "500",
    marginTop: 5,
    backgroundColor: "white",
    width: "90%",
    opacity: 0.7,
  },
  image: {
    width: "100%",
    height: "45%",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    width: "90%",
    backgroundColor: COLS.C6_WHITE_TEXT,
    opacity: 0.7,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 20,
    padding: 12,
    fontWeight: "bold",
    color: "black",
    fontWeight: "900",
  },
  methodIngredientsButton: {
    width: "50%",
    borderBottomColor: COLS.C_RED,

    borderBottomWidth: 2,
  },
  selectedMethodIngredientsButton: {
    width: "50%",
    opacity: 0.7,
  },

  ingredientsAndMethodContainer: {
    width: "100%",
    height: "100%",
  },
  ingredientsAndMethodView: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    opacity: 0.7,
  },
  ingredientsAndMethod: {
    height: "100%",
    backgroundColor: "C6_WHITE_TEXT",
    margin: 15,
    marginTop: 5,
    padding: 10,
    borderColor: COLS.C4_DARK_TEXT,
    borderStyle: "solid",
    backgroundColor: COLS.C6_WHITE_TEXT,
    fontSize: 16,
    opacity: 0.7,
  },
});

function Item({ ingredient, quantity, leadingChar = "\u2022" }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {<Text style={{ fontWeight: "bold" }}>{`${leadingChar} `}</Text>}
        {`${quantity} ${ingredient || ""}\n`}
      </Text>
    </View>
  );
}

function cleanString(string) {
  return string.split('","').map((x) => x.replace(/"|{|}|\\|\//g, ""));
}

export default function TodaysRecipe() {
  const { recipeList } = useContext(AuthContext);
  const [showIngredients, setShowIngredients] = useState(false);
  const recipeIndex = 0; // TODO make this increment depending on the number of days since last recipe request
  const todaysRecipe = recipeList[recipeIndex];
  const ingredients = cleanString(todaysRecipe.ingredients);
  const quantities = cleanString(todaysRecipe.ingredientsquantities);
  const method = cleanString(todaysRecipe.method);

  function changeMethodButtonColour() {
    setShowIngredients(false);
  }

  function changeIngredientsButtonColour() {
    setShowIngredients(true);
  }

  const ingredientsContainer = (
    <View style={styles.ingredientsAndMethodContainer}>
      <ScrollView style={styles.ingredientsAndMethodView}>
        {ingredients.map((item, index) => (
          <Item
            ingredient={item}
            quantity={quantities[index]}
            key={
              item
                .split(" ")
                .join("")
                .replace(/,|-|\(|\)/g, "") +
              "" +
              index
            }
          />
        ))}
      </ScrollView>
    </View>
  );

  const methodContainer = (
    <ScrollView style={styles.ingredientsAndMethodView}>
      <View style={styles.ingredientsAndMethodContainer}>
        {method.map((item, index) => (
          <Item
            quantity={item}
            leadingChar={"Step " + (index + 1)}
            key={
              item
                .split(" ")
                .join("")
                .replace(/,|-|\(|\)/g, "") +
              "" +
              index
            }
          />
        ))}
      </View>
    </ScrollView>
  );

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
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          {todaysRecipe.name.replace(/\s+/g, " ")}
        </Text>
        <Image style={styles.image} source={{ uri: todaysRecipe.url }} />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={
              showIngredients
                ? styles.selectedMethodIngredientsButton
                : styles.methodIngredientsButton
            }
            onPress={() => changeMethodButtonColour()}
          >
            <Text style={styles.buttonText}>Method</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              showIngredients
                ? styles.methodIngredientsButton
                : styles.selectedMethodIngredientsButton
            }
            onPress={() => changeIngredientsButtonColour()}
          >
            <Text style={styles.buttonText}>Ingredients</Text>
          </TouchableOpacity>
        </View>
        {showIngredients ? ingredientsContainer : methodContainer}
      </View>
    </ImageBackground>
  );
}
