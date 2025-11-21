package com.ud11.groceries.classes.Ingredient;

import com.ud11.groceries.classes.Allergies;
import com.ud11.groceries.classes.Diets;
import com.ud11.groceries.classes.Unit;

import java.util.ArrayList;

public record Ingredient (
        long id,

        String name,
        String description,

        Unit unit, // the most common unit of measurement for this ingredient

        double density, // density in g/mL for conversion between weight and volume; -1 if not applicable
        double pricePerUnit, // price per unit in cents (e.g., 199.0 = $1.99)
        double caloriesPerUnit, // calories per unit
        //TODO (mateotorres): add more nutritional information to ingredients

        ArrayList<Allergies> allergens, // list of allergens
        ArrayList<Diets> diets // suitable for which diets
){
    @Override
    public boolean equals(Object obj) {
        //compare by id
        if (this == obj) return true;
        if (obj == null || this.getClass() != obj.getClass()) return false;
        Ingredient that = (Ingredient) obj;
        return this.id == that.id;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", unit=" + unit +
                ", density=" + density +
                ", pricePerUnit=" + pricePerUnit +
                ", caloriesPerUnit=" + caloriesPerUnit +
                ", allergens=" + allergens +
                ", diets=" + diets +
                '}';
    }

}
