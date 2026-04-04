package com.ud11.groceries.controllers.Recipes;


import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import com.ud11.groceries.classes.RecipeTag;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class CreateRecipeDto {
    private String name;
    private ArrayList<RecipeIngredientWrapper> ingredients; // list of wrappers now
    private String timeToPrep;
    private String timeToCook;
    private String timeTotal;
    private String description;
    private String instructions;
    private String imageUrl;
//    private ArrayList<RecipeTag> tags;
}
