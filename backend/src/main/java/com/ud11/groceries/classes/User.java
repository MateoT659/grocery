package com.ud11.groceries.classes;

import java.lang.reflect.Array;
import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
    long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private ArrayList<Allergies> allergiesList;
    private ArrayList<Diets> dietsList;
    private ArrayList<Long> likedRecipes;

    public User() {}

    public User(long id, String name, String username, String email, String password, ArrayList<Allergies> allergiesList, ArrayList<Diets> dietsList, ArrayList<Long> likedRecipes) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.allergiesList = allergiesList;
        this.dietsList = dietsList;
        this.likedRecipes = likedRecipes;

    }

}
