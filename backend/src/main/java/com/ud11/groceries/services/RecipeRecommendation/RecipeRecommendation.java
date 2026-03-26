package com.ud11.groceries.services.RecipeRecommendation;

import com.ud11.groceries.classes.*;
import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.services.Recipes.RecipeRetriever;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class RecipeRecommendation {

    public ArrayList<Recipe> recommendRecipes(User user) throws IOException {
        RecipeRetriever rr = new RecipeRetriever();

        Recipe[] allRecipes = rr.fetchAllRecipes();

        //apply recipe filtering
//        if (inputs.getRecipeTags() != null && !inputs.getRecipeTags().isEmpty()) {
//            allRecipes = Arrays.stream(allRecipes).filter(recipe -> recipe.getTags() != null && recipe.getTags().stream().anyMatch(inputs.getRecipeTags()::contains)).toArray(Recipe[]::new);
//        }

        //get a list of recipes that the user liked
        ArrayList<Long> likedRecipeIds = user.getLikedRecipes() != null ? user.getLikedRecipes() : new ArrayList<>();

        ArrayList<Recipe> likedRecipes = new ArrayList<>();

        for (long recipeId : likedRecipeIds) {
            Recipe recipe = rr.fetchRecipe(recipeId);
            likedRecipes.add(recipe);
        }

        //eliminate recipes that were liked by the user
//        ArrayList<Recipe> filteredRecipes = Arrays.stream(allRecipes).filter(r -> !likedRecipes.contains(r)).collect(Collectors.toCollection(ArrayList::new));

        //get the users allergy and dietary restrictions, reduce score for recipes containing these elements
        ArrayList<Allergies> userAllergies = user.getAllergiesList();
        ArrayList<Diets> userDiets = user.getDietsList();


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

        //score recipes
        HashMap<Recipe, Integer> scoredRecipes = scoreRecipes(allRecipes, likedRecipes, likedRecipeIngredients, likedRecipeTags, userAllergies, userDiets);

        //sort recipes by score, tied scores should be listed randomly
        ArrayList<Recipe> sortedRecipes = sortRecipesByScore(scoredRecipes);

        return sortedRecipes;
    }


    public HashMap<Recipe, Integer> scoreRecipes(Recipe[] allRecipes, ArrayList<Recipe> likedRecipes, ArrayList<RecipeIngredientWrapper> likedRecipeIngredients, ArrayList<RecipeTag> likedRecipeTags, ArrayList<Allergies> userAllergies, ArrayList<Diets> userDiets) {
        HashMap<Recipe, Integer> scoredRecipes = new HashMap<>();
        for (Recipe recipe : allRecipes) {
            int score = 0;

            // check if recipe is a liked recipe; if so, move it lower in the feed bc users have already seen it
            if (likedRecipes.contains(recipe)) {
                Random rand = new Random();
                int scoreDecrement = rand.nextInt(10 - 6 + 1) + 6; // (max - min + 1) + min
                score -= scoreDecrement;
            }

            ArrayList<RecipeIngredientWrapper> currRecipeIngredients = recipe.getIngredients();

            // check for overlapping ingredients with liked recipes and all recipes
            for (RecipeIngredientWrapper ingredient : currRecipeIngredients) {
                if (likedRecipeIngredients.contains(ingredient)) {
                    score += 1;
                }
            }

            ArrayList<RecipeTag> currRecipeTags = recipe.getTags();

            // check for overlapping tags with liked recipes and all recipes
            for (RecipeTag tag : currRecipeTags) {
                if (likedRecipeTags.contains(tag)) {
                    score += 3;
                }
            }

            // check for ingredients in all recipes that are forbidden by the users allergies
            for (Allergies allergy : userAllergies) {
                List<String> forbidden = DietaryRules.allergyForbiddenIngredients.get(allergy);
                for (RecipeIngredientWrapper ingredient : currRecipeIngredients) {
                    String ingredientName = ingredient.ingredientDisplayName().toLowerCase();

                    if (forbidden.stream().anyMatch(ingredientName::contains)) {
                        score -= 5;
                    }
                }
            }

            // check for ingredients in all recipes that are forbidden by the users diets
            for (Diets diet : userDiets) {
                List<String> forbidden = DietaryRules.dietForbiddenIngredients.get(diet);
                for (RecipeIngredientWrapper ingredient : currRecipeIngredients) {
                    String ingredientName = ingredient.ingredientDisplayName().toLowerCase();

                    if (forbidden.stream().anyMatch(ingredientName::contains)) {
                        score -= 4;
                    }
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


