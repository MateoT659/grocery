package com.ud11.groceries.classes;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum Diets {
    VEGETARIAN,
    VEGAN,
    PESCATARIAN,
    HALAL,
    KOSHER,
    GLUTEN_FREE,

}