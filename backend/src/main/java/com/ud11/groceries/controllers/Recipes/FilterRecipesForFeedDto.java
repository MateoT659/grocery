package com.ud11.groceries.controllers.Recipes;

import com.ud11.groceries.classes.Allergies;
import com.ud11.groceries.classes.Diets;
import com.ud11.groceries.classes.Recipe.Recipe;

import java.util.ArrayList;

public record FilterRecipesByDietAllergiesDto(
        ArrayList<Recipe> recipe,
        ArrayList<Diets> diets,
        ArrayList<Allergies> allergies
) {
}
