package com.ud11.groceries.services.RecipeRecommendation;

import com.ud11.groceries.classes.RecipeTag;
import com.ud11.groceries.classes.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter @Setter
public class RecommendRecipesDto {
    private User user;
    private ArrayList<RecipeTag> recipeTags;
}
