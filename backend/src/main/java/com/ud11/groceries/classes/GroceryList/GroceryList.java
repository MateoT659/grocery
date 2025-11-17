package com.ud11.groceries.classes.GroceryList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter @AllArgsConstructor @NoArgsConstructor
public class GroceryList {
    long id;
    String name;
    String description;
    ArrayList<ListIngredientWrapper> items;

    @Override
    public String toString() {
        return "GroceryList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", items=" + items +
                '}';
    }
}
