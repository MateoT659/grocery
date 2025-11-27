package com.ud11.groceries.classes.Recipe;

import java.util.ArrayList;

import com.ud11.groceries.classes.RecipeTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Recipe class
@Getter @Setter @NoArgsConstructor
public class Recipe {
    long id;
    private String name;
    private ArrayList<RecipeIngredientWrapper> ingredients; // list of wrappers now
    private int timeToMakeMin;
    private String description;
    private ArrayList<RecipeTag> tags;

    public Recipe(long id, String name, ArrayList<RecipeIngredientWrapper> ingredients, int timeToMakeMin, String description, ArrayList<RecipeTag> tags) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.timeToMakeMin = timeToMakeMin;
        this.description = description;
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ingredients=" + ingredients +
                ", timeToMakeMin=" + timeToMakeMin +
                ", description='" + description + '\'' +
                ", tags=" + tags +
                '}';
    }
}
