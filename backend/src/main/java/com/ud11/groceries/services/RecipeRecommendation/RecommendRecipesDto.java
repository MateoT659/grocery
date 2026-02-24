package com.ud11.groceries.services.RecipeRecommendation;

import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.User;

import java.util.ArrayList;

public record RecommendRecipesDto (
    User user,
    ArrayList<RecipeTag> recipeTags
) {}
