package com.ud11.groceries.controllers.Recipes;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter @Setter
public class UpdateRecipeDto {
    private String name;
    private String instructions;
    private Integer timeToPrep;
    private Integer timeToCook;
    private Integer timeTotal;
    private String description;
    private String imageUrl;
    private ArrayList<String> tags;
}
