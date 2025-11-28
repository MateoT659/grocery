package com.ud11.groceries.classes;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum RecipeTag {
    VEGETARIAN,
    VEGAN,
    HALAL,
    KOSHER,
    GLUTEN_FREE,
    BREAKFAST,
    LUNCH,
    DINNER,
    THAI,
    INDIAN,
    MEXICAN,
    VIETNAMESE,
    MIDDLE_EASTERN,
    SPANISH,
    AMERICAN,
    ITALIAN,
    CHINESE,
    COLOMBIAN,
    JAPANESE,
    COMFORT
}
