package com.ud11.groceries.classes.Recipe;

import lombok.Getter;
import java.util.ArrayList;

//to be used for efficiency in algorithms.
@Getter
public class SimpleRecipe {
    long recipeId;
    ArrayList<Long> ingredientIds;

    public SimpleRecipe(long recipeId, ArrayList<Long> ingredientIds) {
        this.recipeId = recipeId;
        this.ingredientIds = ingredientIds;
    }
}
