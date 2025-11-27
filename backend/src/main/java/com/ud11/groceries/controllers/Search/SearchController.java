package com.ud11.groceries.controllers.Search;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.services.RecipeRetriever;
import com.ud11.groceries.services.SearchRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/search-api")
@CrossOrigin(origins = "http://localhost:8081")
public class SearchController {

    @Autowired
    private RecipeRetriever rr;

    @Autowired
    private SearchRetriever sr;

    // Endpoint 1: Get All Recipes
    @GetMapping("/get-recipes")
    public Recipe[] getRecipes() throws IOException {
        return rr.fetchAllRecipes();
    }

    // Endpoint 2: Search Recipes
    // Usage: GET /search-api/search?q=chicken
    @GetMapping("/search")
    public List<Recipe> getSearch(@RequestParam String q) throws IOException {
        // 1. Fetch the data (or retrieve from cache if you have one)
        Recipe[] allRecipes = rr.fetchAllRecipes();

        // 2. Pass the query and the data to the service
        return sr.searchRecipes(q, allRecipes);
    }
}