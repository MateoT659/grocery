package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.RecipeRecommendation.RecipeRecommendation;
import com.ud11.groceries.services.RecipeRecommendation.RecommendRecipesDto;
import com.ud11.groceries.services.RecipeRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/recipe-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class RecipeController {

    @Autowired
    private RecipeRetriever rr;
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

    @GetMapping("/debug-tags")
    public List<RecipeTag> debugTags() {
        return List.of(RecipeTag.values());
    }

    @PostMapping("/get-recipe-recs")
    public ArrayList<Recipe> getRecipeRecs(@RequestBody RecommendRecipesDto inputs) throws IOException {
        return recipeRec.recommendRecipes(inputs);
    }
}
