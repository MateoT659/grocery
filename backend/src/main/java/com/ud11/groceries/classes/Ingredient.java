package com.ud11.groceries.classes;

import java.util.ArrayList;

public class Ingredient {
    private String name;
    private String description;
    private String unit; // e.g., grams, liters, pieces, how is this ingredient measured
    private ArrayList<Allergies> allergens; // list of allergensgit a
    private ArrayList<Diets> diets; // suitable for which diets

}
