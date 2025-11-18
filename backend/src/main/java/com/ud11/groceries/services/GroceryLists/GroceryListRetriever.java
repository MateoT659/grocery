package com.ud11.groceries.services.GroceryLists;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.GroceryList.GroceryList;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

//specifically for viewing purposes
@Service
public class GroceryListRetriever {
    public static String GROCERY_LIST_DATA_PATH = "src/main/java/com/ud11/groceries/data/GroceryLists.json";

    public GroceryList[] fetchAllLists() throws IOException{
        ObjectMapper oM = new ObjectMapper();
        File file = new File(GROCERY_LIST_DATA_PATH);
        return oM.readValue(file, GroceryList[].class);
    }

    public GroceryList fetchList(long id) throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(GROCERY_LIST_DATA_PATH);
        GroceryList[] groceryLists = oM.readValue(file, GroceryList[].class);
        for (GroceryList list : groceryLists) {
            if (list.getId() == id) {
                return list;
            }
        }
        throw new IOException("GroceryList with id "+id+" not found");
    }
}