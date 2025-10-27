package com.ud11.groceries.classes.GroceryList;

import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.classes.Unit;

public record ListIngredientWrapper (
    Ingredient ingredient,
    int quantity,
    Unit unit,
    String notes, // e.g. "softened" vs "melted butter"
    boolean checked
){
}
