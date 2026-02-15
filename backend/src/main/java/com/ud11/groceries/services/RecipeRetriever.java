package com.ud11.groceries.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.Recipe.Recipe;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

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

    public static void main(String[] args) throws IOException {
        RecipeRetriever rr = new RecipeRetriever();
        Recipe[] recipes = rr.fetchAllRecipes();
        Scanner scanner = new Scanner(System.in);
        for (Recipe recipe : recipes) {

            System.out.println("Enter image URL for recipe: " + recipe.getName());
            recipe.setImageUrl(scanner.nextLine());
        }
            ObjectMapper oM = new ObjectMapper();
            oM.writerWithDefaultPrettyPrinter().writeValue(new File(RECIPE_DATA_PATH), recipes);

    }
}

