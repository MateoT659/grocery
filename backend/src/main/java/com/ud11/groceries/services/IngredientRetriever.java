package com.ud11.groceries.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.classes.Recipe.Recipe;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class IngredientRetriever {
    public static String INGREDIENT_DATA_PATH = "src/main/java/com/ud11/groceries/data/Ingredients.json";

    Ingredient[] ingredients;

    public IngredientRetriever() throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(INGREDIENT_DATA_PATH);
        this.ingredients = oM.readValue(file, Ingredient[].class);;
    }

    public Ingredient[] fetchAllIngredients() {
        return this.ingredients;
    }

    public Ingredient fetchIngredient(long id) throws IOException {
        for (Ingredient ingredient : ingredients) {
            if (ingredient.id() == id) {
                return ingredient;
            }
        }
        throw new IOException("Ingredient with id "+id+" not found");
    }
}
