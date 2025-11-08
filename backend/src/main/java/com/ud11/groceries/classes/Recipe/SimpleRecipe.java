package com.ud11.groceries.classes.Recipe;

import java.util.ArrayList;

//to be used for efficiency in algorithms.

public class SimpleRecipe {
    long recipeId;
    ArrayList<Long> ingredientIds;

    public SimpleRecipe(long recipeId, ArrayList<Long> ingredientIds) {
        this.recipeId = recipeId;
        this.ingredientIds = ingredientIds;
    }

    public long getRecipeId() {
        return recipeId;
    }
}
