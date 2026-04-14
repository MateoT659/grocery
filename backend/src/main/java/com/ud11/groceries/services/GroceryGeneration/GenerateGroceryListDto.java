package com.ud11.groceries.services.GroceryGeneration;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.Recipe.Recipe;

public record GenerateGroceryListDto (
    int nRecipes,
    GroceryList groceryListArgs,
    long[] recipeSeed //list of recipe ids to seed generation.
){}
