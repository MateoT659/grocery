package com.ud11.groceries.classes;

import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
    private String name;
    private String username;
    private String email;
    private String password;
    private ArrayList<Allergies> allergiesList;
    private ArrayList<Diets> dietsList;

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;

    }

}
