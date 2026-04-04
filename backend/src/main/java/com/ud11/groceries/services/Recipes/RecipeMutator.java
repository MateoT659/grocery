package com.ud11.groceries.services.Recipes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.controllers.Recipes.UpdateRecipeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ud11.groceries.classes.Recipe.Recipe;

import java.io.File;
import java.io.IOException;

@Service
public class RecipeMutator {

    public static String RECIPE_DATA_PATH = "src/main/java/com/ud11/groceries/data/Recipes.json";

    private final RecipeRetriever rR;
    private final ObjectMapper oM;

    @Autowired
    public RecipeMutator(RecipeRetriever rR) {
        this.oM = new ObjectMapper();
        this.rR = rR;
    }

    public Recipe patchRecipe(long id, UpdateRecipeDto updates) throws IOException {

        Recipe[] recipes = rR.fetchAllRecipes();
        Recipe targetRecipe = null;

        for (Recipe recipe : recipes) {
            if (recipe.getId() == id) {
                if (updates.getName() != null) {
                    recipe.setName(updates.getName());
                }
                if (updates.getDescription() != null) {
                    recipe.setDescription(updates.getDescription());
                }
                if (updates.getTimeToPrep() != null) {
                    recipe.setTimeToPrep(updates.getTimeToPrep());
                }
                if (updates.getTimeToCook() != null) {
                    recipe.setTimeToCook(updates.getTimeToCook());
                }
                if (updates.getTimeTotal() != null) {
                    recipe.setTimeTotal(updates.getTimeTotal());
                }
                if (updates.getInstructions() != null) {
                    recipe.setInstructions(updates.getInstructions());
                }
                if (updates.getImageUrl() != null) {
                    recipe.setImageUrl(updates.getImageUrl());
                }
                targetRecipe = recipe;
                break;
            }
        }
        if (targetRecipe == null) {
            throw new IOException("Recipe with id " + id + " not found");
        }
        // Write the modified array back to the file
        oM.writerWithDefaultPrettyPrinter().writeValue(new File(RECIPE_DATA_PATH), recipes);
        return targetRecipe;
    }

}