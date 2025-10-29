package com.ud11.groceries.classes.GroceryList;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;

@Getter @AllArgsConstructor
public class GroceryList {
    long id;
    String name;
    String description;
    ArrayList<ListIngredientWrapper> items;
}
