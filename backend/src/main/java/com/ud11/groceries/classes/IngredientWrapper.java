package com.ud11.groceries.classes;

// ✅ Record for IngredientWrapper
public record IngredientWrapper(
        Ingredient ingredient,
        int quantity,
        Unit unit,
        String notes // e.g. "softened" vs "melted butter"
) {
}