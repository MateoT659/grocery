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
public class SearchController{

    @Autowired private RecipeRetriever rr;
    @Autowired private SearchRetriever sr;

    @GetMapping("/search")
    public List<Recipe> getSearch (@RequestParam String q) throws IOException{
        Recipe[] allRecipes = rr.fetchAllRecipes();
        return sr.searchHelper(q, allRecipes);
    }

}
