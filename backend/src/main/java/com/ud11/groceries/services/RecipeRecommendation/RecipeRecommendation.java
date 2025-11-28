package com.ud11.groceries.services.RecipeRecommendation;

import com.ud11.groceries.classes.Allergies;
import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.RecipeRetriever;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

@Service
public class RecipeRecommendation {

    public ArrayList<Recipe> recommendRecipes(User user) throws IOException {
        RecipeRetriever rr = new RecipeRetriever();

        Recipe[] allRecipes = rr.fetchAllRecipes();

        //get a list of recipes that the user liked
        ArrayList<Long> likedRecipeIds = user.getLikedRecipes();

        ArrayList<Recipe> likedRecipes = new ArrayList<>();

        for (long recipeId : likedRecipeIds) {
            Recipe recipe = rr.fetchRecipe(recipeId);
            likedRecipes.add(recipe);
        }

        //eliminate recipes that were liked by the user
        Recipe[] filteredRecipes = Arrays.stream(allRecipes).filter(r -> !likedRecipes.contains(r)).toArray(Recipe[]::new);


        //remove recipes that don't align with dietary restrictions
        ArrayList<Allergies> userAllergies = user.getAllergiesList();

        ArrayList<Recipe> validRecipes = eliminateAllergies(filteredRecipes, userAllergies);

        //collect the tags from each recipe the user liked
        //collect the ingredients ids from each recipe the user liked
        ArrayList<RecipeTag> likedRecipeTags = new ArrayList<>();;
        ArrayList<RecipeIngredientWrapper> likedRecipeIngredients = new ArrayList<>();

        for (Recipe likedRecipe : likedRecipes) {
            ArrayList<RecipeTag> currRecipeTags = likedRecipe.getTags();
            ArrayList<RecipeIngredientWrapper> currRecipeIngredients = likedRecipe.getIngredients();

            likedRecipeTags.addAll(currRecipeTags);
            likedRecipeIngredients.addAll(currRecipeIngredients);
        }

        //score valid recipes
        HashMap<Recipe, Integer> scoredRecipes = scoreRecipes(validRecipes, likedRecipeIngredients, likedRecipeTags);

        //sort recipes by score, tied scores should be listed randomly
        ArrayList<Recipe> sortedRecipes = sortRecipesByScore(scoredRecipes);

        return sortedRecipes;
    }

    public ArrayList<Recipe> eliminateAllergies(Recipe[] recipes, ArrayList<Allergies> userAllergies) {
        ArrayList<Recipe> validRecipes = new ArrayList<>();

        for (Recipe recipe : recipes) {
            ArrayList<RecipeTag> currRecipeTags = recipe.getTags();
            for (RecipeTag tag : currRecipeTags) {
                //check if the recipe contains a tag that is in the user's allergy list
                boolean allergyMatch = userAllergies.stream().anyMatch(allergy -> allergy.name().equals(tag.name()));

                if (!allergyMatch) {
                    validRecipes.add(recipe);
                }
            }
        }
        return validRecipes;
    }

    public HashMap<Recipe, Integer> scoreRecipes(ArrayList<Recipe> validRecipes, ArrayList<RecipeIngredientWrapper> likedRecipeIngredients, ArrayList<RecipeTag> likedRecipeTags) {
        HashMap<Recipe, Integer> scoredRecipes = new HashMap<>();
        for (Recipe recipe : validRecipes) {
            int score = 0;
            ArrayList<RecipeIngredientWrapper> currRecipeIngredients = recipe.getIngredients();

            for (RecipeIngredientWrapper ingredient : currRecipeIngredients) {
                if (likedRecipeIngredients.contains(ingredient)) {
                    score += 1;
                }
            }

            ArrayList<RecipeTag> currRecipeTags = recipe.getTags();

            for (RecipeTag tag : currRecipeTags) {
                if (likedRecipeTags.contains(tag)) {
                    score += 3;
                }
            }

            scoredRecipes.put(recipe, score);

        }

        return scoredRecipes;
    }

    public ArrayList<Recipe> sortRecipesByScore(HashMap<Recipe, Integer> scoredRecipes) {
        ArrayList<Recipe> sortedRecipes = new ArrayList<>(scoredRecipes.keySet());

        sortedRecipes.sort((a, b) -> {
            int scoreA = scoredRecipes.get(a);
            int scoreB = scoredRecipes.get(b);

            if (scoreA != scoreB) {
                return Integer.compare(scoreB, scoreA);
            }

            return Math.random() < 0.5 ? -1 : 1;
        });

        return sortedRecipes;
    }

}
