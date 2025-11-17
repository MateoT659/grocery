package com.ud11.groceries.services.GroceryLists;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.GroceryList.GroceryList;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class GroceryListRetriever {
    public static String GROCERY_LIST_DATA_PATH = "src/main/java/com/ud11/groceries/data/GroceryLists.json";

    GroceryList[] groceryLists;

    public GroceryListRetriever() throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(GROCERY_LIST_DATA_PATH);
        this.groceryLists = oM.readValue(file, GroceryList[].class);;
    }

    public GroceryList[] fetchAllLists() {
        return this.groceryLists;
    }

    public GroceryList fetchList(long id) throws IOException {
        //note: this will be re-made when we have a database
        for (GroceryList list : this.groceryLists) {
            if (list.getId() == id) {
                return list;
            }
        }
        throw new IOException("GroceryList with id "+id+" not found");
    }
}