package com.ud11.groceries.classes.Ingredient;

import com.ud11.groceries.classes.GroceryList.ListIngredientWrapper;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.classes.Unit;

public class IngredientHelper {
    public ListIngredientWrapper wrapIngredientForList(Ingredient ingredient, int quantity, String notes, boolean checked, Unit unit) {
        return new ListIngredientWrapper(ingredient.id(), ingredient.name(), quantity, unit, notes, checked);
    }

    public ListIngredientWrapper wrapIngredientForListDefaults(Ingredient ingredient) {
        return new ListIngredientWrapper(ingredient.id(), ingredient.name(), 1, ingredient.unit(), "", false);
    }

    public RecipeIngredientWrapper wrapIngredientForRecipe(Ingredient ingredient, int quantity, String notes, Unit unit, boolean optional) {
        return new RecipeIngredientWrapper(ingredient.id(), ingredient.name(), quantity, unit, notes, optional);
    }
}
