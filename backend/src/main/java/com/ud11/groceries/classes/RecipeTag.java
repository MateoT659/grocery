package com.ud11.groceries.classes;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum RecipeTag {
    BREAKFAST,
    LUNCH,
    DINNER,
    DESSERT,
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
    COMFORT,
    HEALTHY,
}
