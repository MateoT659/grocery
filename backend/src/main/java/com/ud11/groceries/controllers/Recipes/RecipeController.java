package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeHelper;
import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.RecipeRecommendation.RecipeRecommendation;
import com.ud11.groceries.services.RecipeRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/recipe-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class RecipeController {

    @Autowired
    private RecipeRetriever rr;
    @Autowired
    private RecipeRecommendation recipeRec;
    @Autowired
    private RecipeHelper rH;

    @GetMapping("/get-recipes")
    public Recipe[] getRecipes() throws IOException {
        return rr.fetchAllRecipes();
    }

    @GetMapping("/get-recipe/{id}")
    public Recipe getRecipe(@PathVariable long id) throws IOException {
        return rr.fetchRecipe(id);
    }

    @PostMapping("/get-recipe-recs")
    public ArrayList<Recipe> getRecipeRecs(@RequestBody User user) throws IOException {
        return recipeRec.recommendRecipes(user);
    }

    @PostMapping("/filter-recipes-for-feed")
    public ArrayList<Recipe> filterRecipesForFeed(@RequestBody FilterRecipesForFeedDto args) throws IOException{
        ArrayList<Recipe> ret = new ArrayList<Recipe>();

        for(Recipe recipe: args.recipe()) {
            if(rH.suitableForAllDiets(recipe, args.diets()) && !rH.containsAnyAllergen(recipe, args.allergies())){
                ret.add(recipe);
            }
        }

        return ret;
    }
}
