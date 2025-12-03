package com.ud11.groceries.classes.GroceryList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class GroceryList {
    long id;
    String name;
    String description;
    ArrayList<ListIngredientWrapper> items;
    ArrayList<ListRecipeWrapper> recipes;

    @Override
    public String toString() {
        return "GroceryList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", items=" + items +
                ", recipes=" + recipes +
                '}';
    }
}
