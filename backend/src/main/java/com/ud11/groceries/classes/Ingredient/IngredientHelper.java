package com.ud11.groceries.classes.Ingredient;

import com.ud11.groceries.classes.GroceryList.ListIngredientWrapper;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.classes.Unit;

import java.util.ArrayList;

public class IngredientHelper {
    public ListIngredientWrapper wrapIngredientForList(Ingredient ingredient, int quantity, String notes, boolean checked, Unit unit, ArrayList<Long> fromRecipesIds) {
        return new ListIngredientWrapper(ingredient.id(), ingredient.name(), quantity, unit, notes, checked, fromRecipesIds);
    }

    public RecipeIngredientWrapper wrapIngredientForRecipe(Ingredient ingredient, int quantity, String notes, Unit unit, boolean optional) {
        return new RecipeIngredientWrapper(ingredient.id(), ingredient.name(), quantity, unit, notes, optional);
    }
}
