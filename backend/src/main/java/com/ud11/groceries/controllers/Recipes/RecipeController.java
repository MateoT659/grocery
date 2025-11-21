package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.services.RecipeRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/recipe-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class RecipeController {

    @Autowired
    private RecipeRetriever rr;

    @GetMapping("/get-recipes")
    public Recipe[] getRecipes() throws IOException {
        return rr.fetchAllRecipes();
    }

    @GetMapping("/get-recipe/{id}")
    public Recipe getRecipe(@PathVariable long id) throws IOException {
        return rr.fetchRecipe(id);
    }
}
