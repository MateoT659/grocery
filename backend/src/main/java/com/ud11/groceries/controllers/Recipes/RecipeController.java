package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeHelper;
import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.RecipeRecommendation.RecipeRecommendation;
import com.ud11.groceries.services.Recipes.RecipeMutator;
import com.ud11.groceries.services.Recipes.RecipeRetriever;
import com.ud11.groceries.services.RecipeRecommendation.RecommendRecipesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/recipe-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class RecipeController {
    //controller for viewing and editing recipe data.
    @Autowired
    private RecipeRetriever rr;
    @Autowired
    private RecipeMutator rm;
    @Autowired
    private RecipeRecommendation recipeRec;
    @Autowired
    private RecipeHelper rH;

    //get all recipes, unordered
    @GetMapping("/get-recipes")
    public Recipe[] getRecipes() throws IOException {
        return rr.fetchAllRecipes();
    }

    //get a specific recipe by id
    @GetMapping("/get-recipe/{id}")
    public Recipe getRecipe(@PathVariable long id) throws IOException {
        return rr.fetchRecipe(id);
    }

    //debug endpoint to get all recipe tags
    @GetMapping("/debug-tags")
    public List<RecipeTag> debugTags() {
        return List.of(RecipeTag.values());
    }

    //get a list of recipes ordered by recommendations. Determined by user
    @PostMapping("/get-recipe-recs")
    public ArrayList<Recipe> getRecipeRecs(@RequestBody User user) throws IOException {
        try {
            System.out.println("Received user: " + user);
            return recipeRec.recommendRecipes(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get recipe recommendations");
        }
//        return recipeRec.recommendRecipes(user);
    }

    //filter all recipes by a set of allergies, dietary restrictions, and tags.
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

    //edits a recipe with new data
    @PatchMapping("/update-recipe/{id}")
    public Recipe patchRecipe(@PathVariable long id, @RequestBody UpdateRecipeDto updates) throws IOException {
        return rm.patchRecipe(id, updates);
    }

    //creates a new recipe
    @PostMapping("/create-new-recipe")
    public Recipe postNewRecipe(@RequestBody CreateRecipeDto newRecipe) throws IOException {
        return rm.createRecipe(newRecipe);
    }
}
