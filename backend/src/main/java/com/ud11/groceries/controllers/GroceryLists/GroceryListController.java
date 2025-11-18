package com.ud11.groceries.controllers.GroceryLists;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.services.GroceryLists.GroceryListMutator;
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
    @Autowired
    private GroceryListMutator glm;

    //get all grocery lists at once
    @GetMapping("/get-grocery-lists")
    public GroceryList[] getGroceryLists() throws IOException {
        return glr.fetchAllLists();
    }

    //get a specific grocery list by id
    @GetMapping("/get-grocery-list/{id}")
    public GroceryList getGroceryList(@PathVariable long id) throws IOException {
        return glr.fetchList(id);
    }

    //update a specific grocery list by id
    @PutMapping("/put-grocery-list/{id}")
    public PutGroceryListResponseDto putGroceryList(@PathVariable long id, @RequestBody GroceryList groceryList) throws IOException {
        GroceryList updated;

        try{
            updated = glm.updateList(id, groceryList);
        }
        catch(IOException e){
            return new PutGroceryListResponseDto(false, e.getMessage(), null);
        }
        return new PutGroceryListResponseDto(true, "", updated);
    }

}
