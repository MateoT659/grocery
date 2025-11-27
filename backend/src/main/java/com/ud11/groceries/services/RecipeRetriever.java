package com.ud11.groceries.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.Recipe.Recipe;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class RecipeRetriever {
    public static String RECIPE_DATA_PATH = "src/main/java/com/ud11/groceries/data/Recipes.json";

    Recipe[] recipes;

    public RecipeRetriever() throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(RECIPE_DATA_PATH);
        this.recipes = oM.readValue(file, Recipe[].class);;
    }

    public Recipe[] fetchAllRecipes() {
        return this.recipes;
    }

    public Recipe fetchRecipe(long id) throws IOException {
        //note: this will be re-made when we have a database
        for (Recipe recipe : this.recipes) {
            if (recipe.getId() == id) {
                return recipe;
            }
        }
        throw new IOException("Recipe with id "+id+" not found");
    }
}

