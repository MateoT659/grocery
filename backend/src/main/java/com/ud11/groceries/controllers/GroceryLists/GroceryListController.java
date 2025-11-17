package com.ud11.groceries.controllers.GroceryLists;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.services.GroceryLists.GroceryListRetriever;
import com.ud11.groceries.services.IngredientRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/grocery-list-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class GroceryListController {

    @Autowired
    private GroceryListRetriever glr;

    @GetMapping("/get-grocery-lists")
    public GroceryList[] getGroceryLists() throws IOException {
        return glr.fetchAllLists();
    }

    @GetMapping("/get-grocery-list/{id}")
    public GroceryList getGroceryList(@PathVariable long id) throws IOException {
        return glr.fetchList(id);
    }
}
