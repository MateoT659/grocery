package com.ud11.groceries.classes;

import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class User {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private ArrayList<Allergies> allergiesList;
    private ArrayList<Diets> dietsList;

    public User(String firstName, String lastName, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;

    }

}
