package com.ud11.groceries.classes;

public class Recipe {
    //attributes
    private String name;
    private String[] ingredients;
    private int time;
    private String description;

    //constructor
    public Recipe(String name, String[] ingredients, int time, String description) {
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
    }


    //getter
    public String getName() {
        return name;
    }
    // Setter
    public void setName(String name) {
        this.name = name;
    }
    //getter
    public String[] getIngredients() {
        return ingredients;
    }
    // Setter
    public void setIngredients(String[] ingredients) {
        this.ingredients = ingredients;
    }
    //getter
    public int getTime() {
        return time;
    }
    // Setter
    public void setTime(int time) {
        this.time = time;
    }
    //getter
    public String getDescription() {
        return description;
    }
    // Setter
    public void setDescription(String description) {
        this.description = description;
    }


    public static void main (String[] args) {

    }
}


