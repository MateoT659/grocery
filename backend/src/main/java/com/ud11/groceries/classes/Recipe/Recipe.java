package com.ud11.groceries.classes.Recipe;

import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

// Recipe class
@Getter @Setter
public class Recipe {
    long id;
    private String name;
    private ArrayList<RecipeIngredientWrapper> ingredients; // list of wrappers now
    private int timeToMakeMin;
    private String description;

    public Recipe(long id, String name, ArrayList<RecipeIngredientWrapper> ingredients, int timeToMakeMin, String description) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.timeToMakeMin = timeToMakeMin;
        this.description = description;
    }
//    todo (mateotorres): make this static in a helper
//    public SimpleRecipe getSimpleRecipe(){
//        ArrayList<Long> ingredientIDs = new ArrayList<>();
//        for (RecipeIngredientWrapper riw : this.ingredients) {
//            ingredientIDs.add(riw.ingredientId());
//        }
//        return new SimpleRecipe(this.id, new ArrayList<Long>());
//    }
}
