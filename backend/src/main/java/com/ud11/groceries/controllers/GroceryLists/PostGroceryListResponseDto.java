package com.ud11.groceries.controllers.GroceryLists;

import com.ud11.groceries.classes.GroceryList.GroceryList;

public record PostGroceryListResponseDto (
    boolean success,
    String message,
    GroceryList newGroceryList
){ }
