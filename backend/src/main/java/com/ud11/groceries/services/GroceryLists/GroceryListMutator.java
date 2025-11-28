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

    public GroceryList addList(GroceryList newGroceryList) throws IOException {
        GroceryList[] groceryLists = gLR.fetchAllLists();

        // Create a new array with an additional slot for the new grocery list
        GroceryList[] updatedGroceryLists = new GroceryList[groceryLists.length + 1];

        // Copy existing grocery lists to the new array
        System.arraycopy(groceryLists, 0, updatedGroceryLists, 0, groceryLists.length);

        // Add the new grocery list to the end of the array
        updatedGroceryLists[groceryLists.length] = newGroceryList;

        // Write the updated array back to the JSON file
        oM.writerWithDefaultPrettyPrinter().writeValue(groceryListData, updatedGroceryLists);

        return newGroceryList;
    }

    public void deleteList(long id) throws IOException {
        GroceryList[] groceryLists = gLR.fetchAllLists();

        long length = groceryLists.length;

        boolean found = false;

        for(int i = 0; i<length; i++){
            if(groceryLists[i].getId() == id){
                GroceryList temp = groceryLists[i];
                groceryLists[i] = groceryLists[(int)(length - 1)];
                groceryLists[(int)(length - 1)] = temp;
                found = true;
                break;
            }
        }

        if(!found){
            throw new IOException("GroceryList with id " + id + " not found");
        }

        GroceryList[] updatedGroceryLists = new GroceryList[(int) (length - 1)];

        System.arraycopy(groceryLists, 0, updatedGroceryLists, 0, (int)(length - 1));

        oM.writerWithDefaultPrettyPrinter().writeValue(groceryListData, updatedGroceryLists);
    }
}