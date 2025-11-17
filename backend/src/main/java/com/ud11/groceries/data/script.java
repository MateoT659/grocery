package com.ud11.groceries.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.GroceryList.ListIngredientWrapper;
import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.services.IngredientRetriever;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

public class script {

    public static void main(String[] args) throws IOException {
        int ningredients = 146;

        ArrayList<GroceryList> lists = new ArrayList<>();
        IngredientRetriever ir = new IngredientRetriever();
        Random r = new Random();
        for(int i = 0; i<5; i++){
            int listLen = r.nextInt(5, 20);
            ArrayList<ListIngredientWrapper> list = new ArrayList<ListIngredientWrapper>();
            for(int j = 0; j<listLen; j++){
                int ingredientId = r.nextInt(1, ningredients+1);
                Ingredient ing = ir.fetchIngredient(ingredientId);
                list.add(new ListIngredientWrapper(ingredientId, ing.name(), r.nextInt(1, 6), ing.unit(), "", false));
            }
            GroceryList gl = new GroceryList(i+1, "List "+(i+1), "Randomly generated list "+(i+1), list);
            lists.add(gl);
        }

        for(GroceryList gl : lists){
            System.out.println(gl);
        }

        File groceryData = new File("src/main/java/com/ud11/groceries/data/GroceryLists.json");
        ObjectMapper oM = new ObjectMapper();
        oM.writerWithDefaultPrettyPrinter().writeValue(groceryData, lists);


    }
}
