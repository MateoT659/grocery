package com.ud11.groceries.classes.GroceryList;

import java.awt.*;
import java.util.ArrayList;

//for storing recipe info in grocery lists
public record ListRecipeWrapper (
    long recipeId,
    String recipeName
){}
