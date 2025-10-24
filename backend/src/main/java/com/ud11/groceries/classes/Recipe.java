package com.ud11.groceries.classes;

import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

// ✅ Recipe class
@Getter @Setter
public class Recipe {
    private String name;
    private ArrayList<IngredientWrapper> ingredients; // list of wrappers now
    private int timeToMakeMin;
    private String description;

    // ✅ Updated constructor to match new type
    public Recipe(String name, ArrayList<IngredientWrapper> ingredients, int timeToMakeMin, String description) {
        this.name = name;
        this.ingredients = ingredients;
        this.timeToMakeMin = timeToMakeMin;
        this.description = description;
    }
}
