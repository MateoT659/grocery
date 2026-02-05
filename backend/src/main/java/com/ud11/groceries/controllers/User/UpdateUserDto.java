package com.ud11.groceries.controllers.User;

import com.ud11.groceries.classes.Allergies;
import com.ud11.groceries.classes.Diets;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter @Setter
public class UpdateUserDto {
    private String name;
    private String username;
    private String email;
    private String password;
    private ArrayList<Allergies> allergiesList;
    private ArrayList<Diets> dietsList;
    private ArrayList<Long> likedRecipes;
}
