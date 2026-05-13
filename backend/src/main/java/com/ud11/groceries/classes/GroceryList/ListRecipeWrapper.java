package com.ud11.groceries.classes.GroceryList;

import java.awt.*;
import java.util.ArrayList;

//Wrapper object for holding recipe data in grocery list objects
public record ListRecipeWrapper (
    long recipeId,
    String recipeName
){}
