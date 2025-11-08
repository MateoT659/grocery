package com.ud11.groceries.classes.Recipe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.ud11.groceries.classes.Ingredient;

import java.io.File;
import java.io.FileReader;
import java.util.*;

public class DataCreationTemp {

    public static Ingredient[] getIngredientData() throws Exception {
        ObjectMapper oM = new ObjectMapper();
        File file = new File("src/main/java/com/ud11/groceries/data/Ingredients.json");
        Ingredient[] ingredients = oM.readValue(file, Ingredient[].class);
        return ingredients;
    }

    public static void putIngredientData(Ingredient[] ingredients) throws Exception {
        ObjectMapper oM = new ObjectMapper();
        File file = new File("src/main/java/com/ud11/groceries/data/Ingredients.json");
        oM.writeValue(file, ingredients);
    }

    public static void putRecipeData(Recipe[] recipes) throws Exception {
        ObjectMapper oM = new ObjectMapper();
        File file = new File("src/main/java/com/ud11/groceries/data/Recipes.json");
        oM.writeValue(file, recipes);
    }

    public static String capitalizeAllWords(String str) {
        String[] words = str.split(" ");
        StringBuilder capitalizedStr = new StringBuilder();

        for (String word : words) {
            if (word.length() > 0) {
                capitalizedStr.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1).toLowerCase())
                        .append(" ");
            }
        }

        return capitalizedStr.toString().trim();
    }

    public static void main(String[] args) throws Exception {
    }
}
