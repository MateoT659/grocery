package com.ud11.groceries.classes.Recipe;

import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.classes.Unit;

// ✅ Record for IngredientWrapper
public record RecipeIngredientWrapper(
        Ingredient ingredient,
        int quantity,
        Unit unit,
        String notes // e.g. "softened" vs "melted butter"
) {
}