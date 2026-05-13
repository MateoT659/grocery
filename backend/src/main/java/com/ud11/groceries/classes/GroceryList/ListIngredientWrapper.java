package com.ud11.groceries.classes.GroceryList;

import com.ud11.groceries.classes.Unit;

import java.util.ArrayList;

//Wrapper object to hold ingredient information in grocery lists.
public record ListIngredientWrapper (
    long ingredientId,
    String ingredientDisplayName,
    int quantity,
    Unit unit,
    String notes, // e.g. "softened" vs "melted butter"
    boolean checked,
    ArrayList<Long> fromRecipesIds
){
}
