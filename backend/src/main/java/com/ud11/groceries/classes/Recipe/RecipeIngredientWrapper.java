package com.ud11.groceries.classes.Recipe;

import com.ud11.groceries.classes.Unit;

// ✅ Record for IngredientWrapper
public record RecipeIngredientWrapper(
    long ingredientId,
    String ingredientDisplayName,
    int quantity,
    Unit unit,
    String notes, // e.g. "softened" vs "melted butter"
    boolean optional
) {
}