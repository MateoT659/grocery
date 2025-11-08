package com.ud11.groceries.classes.Recipe;

import com.ud11.groceries.classes.Ingredient;
import com.ud11.groceries.services.IngredientRetriever;

import java.io.IOException;
import java.util.ArrayList;

public class RecipeHelper {

    IngredientRetriever ir;

    public RecipeHelper() throws IOException {
        this.ir = new IngredientRetriever();
    }

    public RecipeHelper(IngredientRetriever ir){
        this.ir = ir;
    }

    public SimpleRecipe getSimpleRecipe(Recipe recipe){
        ArrayList<Long> ingredientIDs = new ArrayList<>();
        for (RecipeIngredientWrapper riw : recipe.getIngredients()) {
            ingredientIDs.add(riw.ingredientId());
        }
        return new SimpleRecipe(recipe.getId(), ingredientIDs);
    }

    public ArrayList<Ingredient> getIngredientsFromRecipe(Recipe recipe) throws IOException{
        ArrayList<Ingredient> ingredients = new ArrayList<>();
        for (RecipeIngredientWrapper riw : recipe.getIngredients()) {
            ingredients.add(ir.fetchIngredient(riw.ingredientId()));
        }
        return ingredients;
    }
}
