package com.ud11.groceries.services.GroceryLists;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.controllers.GroceryLists.PutGroceryListResponseDto;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

//specifically for viewing purposes
@Service
public class GroceryListMutator {
    public static String GROCERY_LIST_DATA_PATH = "src/main/java/com/ud11/groceries/data/GroceryLists.json";

    GroceryListRetriever gLR;
    File groceryListData;
    ObjectMapper oM;

    public GroceryListMutator() throws IOException {
        oM = new ObjectMapper();
        groceryListData = new File(GROCERY_LIST_DATA_PATH);
        gLR = new GroceryListRetriever();
    }

    public GroceryList updateList(long id, GroceryList updatedGroceryList) throws IOException {
        GroceryList[] groceryLists = gLR.fetchAllLists();

        // Find the grocery list with the specified ID and update it
        boolean found = false;
        for (int i = 0; i < groceryLists.length; i++) {
            if (groceryLists[i].getId() == id) {
                groceryLists[i] = updatedGroceryList;
                found = true;
                break;
            }
        }

        if (!found) {
            throw new IOException("GroceryList with id " + id + " not found");
        }

        // Write the updated array back to the JSON file
        oM.writerWithDefaultPrettyPrinter().writeValue(groceryListData, groceryLists);

        return updatedGroceryList;
    }

}