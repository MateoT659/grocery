package com.ud11.groceries.classes;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum Allergies {
    GLUTEN,
    SHELLFISH,
    EGGS,
    FISH,
    PEANUTS,
    SOYBEANS,
    TREE_NUTS,
    SESAME_SEEDS,
    DAIRY,
    LACTOSE,
}
