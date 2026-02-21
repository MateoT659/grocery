package com.ud11.groceries.services.Recipes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.Recipe.Recipe;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class RecipeRetriever {
    public static String RECIPE_DATA_PATH = "src/main/java/com/ud11/groceries/data/Recipes.json";


    public RecipeRetriever() {}

    public Recipe[] fetchAllRecipes() throws IOException{
        ObjectMapper oM = new ObjectMapper();
        File file = new File(RECIPE_DATA_PATH);
        return oM.readValue(file, Recipe[].class);
    }

    public Recipe fetchRecipe(long id) throws IOException {
        Recipe[] recipes = fetchAllRecipes();

        for (Recipe recipe : recipes) {
            if (recipe.getId() == id) {
                return recipe;
            }
        }
        throw new IOException("Recipe with id "+id+" not found");
    }
}

