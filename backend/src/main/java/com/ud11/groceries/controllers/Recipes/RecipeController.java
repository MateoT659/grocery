package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.RecipeRecommendation.RecipeRecommendation;
import com.ud11.groceries.services.Recipes.RecipeMutator;
import com.ud11.groceries.services.Recipes.RecipeRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/recipe-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class RecipeController {

    @Autowired
    private RecipeRetriever rr;
    @Autowired
    private RecipeMutator rm;
    @Autowired
    private RecipeRecommendation recipeRec;

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
    @PatchMapping("/update-recipe/{id}")
    public Recipe patchRecipe(@PathVariable long id, @RequestBody UpdateRecipeDto updates) throws IOException {
        return rm.patchRecipe(id, updates);
    }
}
