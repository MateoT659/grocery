package com.ud11.groceries.controllers.ClassPassing;

import com.ud11.groceries.classes.*;
import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.GroceryList.ListIngredientWrapper;
import com.ud11.groceries.classes.Ingredient.Ingredient;
import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.controllers.Recipes.FilterRecipesForFeedDto;

public record ClassPackageDto (
        //Class package sent to the frontend that contains all classes.
        // Allows frontend to use updated backend classes without any duplicate definitions
        Allergies allergies,
        Diets diets,
        Ingredient ingredient,
        Unit unit,
        User user,
        GroceryList groceryList,
        ListIngredientWrapper listIngredientWrapper,
        Recipe recipe,
        RecipeIngredientWrapper recipeIngredientWrapper,
        RecipeTag recipeTag,
        FilterRecipesForFeedDto filterRecipesForFeedDto

){}
