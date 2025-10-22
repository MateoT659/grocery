package com.ud11.groceries.classes;

import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Recipe {
    //attributes
    private String name;
    private ArrayList<Ingredient> ingredient;
    private int time;
    private String description;

    //constructor
    public Recipe(String name, ArrayList<Ingredient> ingredient, int time, String description) {
        this.name = name;
        this.ingredient = ingredient;
        this.time = time;
        this.description = description;
    }

}
