package com.ud11.groceries.controllers.Recipes;
import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
// DTO used for updating editable recipe fields
@Getter @Setter
public class UpdateRecipeDto {
    private String name;
    private String instructions;
    private Integer timeToPrep;
    private Integer timeToCook;
    private Integer timeTotal;
    private String description;
    private String imageUrl;
    private ArrayList<RecipeIngredientWrapper> ingredients;
    private ArrayList<RecipeTag> tags;
}
