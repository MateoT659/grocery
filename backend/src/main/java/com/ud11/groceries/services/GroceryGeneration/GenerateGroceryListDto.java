package com.ud11.groceries.services.GroceryGeneration;

import com.ud11.groceries.classes.GroceryList.GroceryList;

public record GenerateGroceryListDto (
    int nRecipes,
    GroceryList groceryListArgs
){}
