package com.ud11.groceries.classes;

import java.util.ArrayList;

public record Ingredient (
        long id,

        String name,
        String description,

        Unit unit, // the most common unit of measurement for this ingredient

        double density, // density in g/mL for conversion between weight and volume; -1 if not applicable
        double pricePerUnit, // price per unit in cents (e.g., 199.0 = $1.99)

        ArrayList<Allergies> allergens, // list of allergens
        ArrayList<Diets> diets // suitable for which diets
){}
