package com.ud11.groceries.controllers.Ingredients;

import com.ud11.groceries.classes.Ingredient.Ingredient;
import com.ud11.groceries.services.IngredientRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/ingredient-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class IngredientController {

    @Autowired
    private IngredientRetriever ir;

    @GetMapping("/get-ingredients")
    public Ingredient[] getIngredients() throws IOException {
        return ir.fetchAllIngredients();
    }

    @GetMapping("/get-ingredient/{id}")
    public Ingredient getIngredient(@PathVariable long id) throws IOException {
        return ir.fetchIngredient(id);
    }
}
