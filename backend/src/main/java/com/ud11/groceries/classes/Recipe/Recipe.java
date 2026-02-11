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
    private int timeToPrep;
    private int timeToCook;
    private int timeTotal;
    private String description;
    private String instructions;
    private ArrayList<RecipeTag> tags;

    public Recipe(long id, String name, ArrayList<RecipeIngredientWrapper> ingredients, int timeToPrep, int timeToCook, int timeTotal, String description, String instructions, ArrayList<RecipeTag> tags) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.timeToPrep = timeToPrep;
        this.timeToCook = timeToCook;
        this.timeTotal = timeTotal;
        this.description = description;
        this.instructions = instructions;
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ingredients=" + ingredients +
                ", timeToPrep=" + timeToPrep +
                ", timeToCook=" + timeToCook +
                ", timeTotal=" + timeTotal +
                ", description='" + description + '\'' +
                ", tags=" + tags +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Recipe)) return false;
        Recipe recipe = (Recipe) o;
        return this.id == recipe.id;
    }
}
