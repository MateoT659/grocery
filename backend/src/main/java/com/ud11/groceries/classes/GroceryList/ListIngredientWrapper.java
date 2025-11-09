package com.ud11.groceries.classes.GroceryList;

import com.ud11.groceries.classes.Unit;

public record ListIngredientWrapper (
    long ingredientId,
    String ingredientDisplayName,
    int quantity,
    Unit unit,
    String notes, // e.g. "softened" vs "melted butter"
    boolean checked
){
}
