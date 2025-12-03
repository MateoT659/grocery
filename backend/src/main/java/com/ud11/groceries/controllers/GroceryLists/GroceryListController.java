package com.ud11.groceries.controllers.GroceryLists;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.services.GroceryGeneration.GenerateGroceryListDto;
import com.ud11.groceries.services.GroceryGeneration.GenerateGroceryListResponseDto;
import com.ud11.groceries.services.GroceryGeneration.GroceryListGenerator;
import com.ud11.groceries.services.GroceryLists.GroceryListMutator;
import com.ud11.groceries.services.GroceryLists.GroceryListRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/grocery-list-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class GroceryListController {

    @Autowired
    private GroceryListRetriever groceryListRetriever;
    @Autowired
    private GroceryListMutator groceryListMutator;
    @Autowired
    private GroceryListGenerator groceryListGenerator;

    //get all grocery lists at once
    @GetMapping("/get-grocery-lists")
    public GroceryList[] getGroceryLists() throws IOException {
        return groceryListRetriever.fetchAllLists();
    }

    //get a specific grocery list by id
    @GetMapping("/get-grocery-list/{id}")
    public GroceryList getGroceryList(@PathVariable long id) throws IOException {
        return groceryListRetriever.fetchList(id);
    }

    //update a specific grocery list by id
    @PutMapping("/put-grocery-list/{id}")
    public PutGroceryListResponseDto editGroceryList(@PathVariable long id, @RequestBody GroceryList groceryList) {
        GroceryList updated;
        try{
            updated = groceryListMutator.updateList(id, groceryList);
        }
        catch(IOException e){
            return new PutGroceryListResponseDto(false, e.getMessage(), null);
        }
        return new PutGroceryListResponseDto(true, "", updated);
    }

    //add a new grocery list
    @PostMapping("/add-grocery-list" )
    public PostGroceryListResponseDto addGroceryList(@RequestBody GroceryList groceryList) {
        GroceryList toAdd;
        try{
            toAdd = groceryListMutator.addList(
                new GroceryList(groceryListRetriever.getNextId(), groceryList.getName(), groceryList.getDescription(), groceryList.getItems(), groceryList.getRecipes())
            );
        } catch (IOException e) {
            return new PostGroceryListResponseDto(false, "" + e.getMessage(), null);
        }

        return new PostGroceryListResponseDto(true, "", toAdd);
    }

    //remove a grocery list by id
    @DeleteMapping("/delete-grocery-list/{id}")
    public DeleteGroceryListResponseDto deleteGroceryList(@PathVariable long id){
        try{
            groceryListMutator.deleteList(id);
        } catch (IOException e) {
            return new DeleteGroceryListResponseDto(false, "" + e.getMessage());
        }

        return new DeleteGroceryListResponseDto(true, "");
    }

    //generate a grocery list
    @RequestMapping("/generate-grocery-list")
    public GenerateGroceryListResponseDto generateGroceryList(@RequestBody GenerateGroceryListDto generateGroceryListDto) {
        GroceryList generated;
        try{
            generated = groceryListMutator.addList(
                    groceryListGenerator.generateGroceryList(generateGroceryListDto)
            );
        } catch (IOException e) {
            return new GenerateGroceryListResponseDto(false, "Could not generate grocery list: " + e.getMessage(), null);
        }
        return new GenerateGroceryListResponseDto(true, "", generated);
    }

}
