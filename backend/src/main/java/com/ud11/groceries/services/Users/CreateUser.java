package com.ud11.groceries.services.Users;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.User;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class CreateUser {
    public static String USER_DATA_PATH = "src/main/java/com/ud11/groceries/data/Users.json";

    UserRetriever uR;
    File userData;
    ObjectMapper oM;

    public CreateUser () throws IOException {
        uR = new UserRetriever();
        userData = new File(USER_DATA_PATH);
        oM = new ObjectMapper();
    }

    public User CreateUser (User newUser) throws IOException{
        User[] existingUsers = uR.fetchAllUsers();
        long newId = 1;
        if (existingUsers.length > 0){   //find the highest id and + 1
            for (int i = 0; i < existingUsers.length; i++) {
                if (existingUsers[i].getId() >= newId) {
                    newId = existingUsers[i].getId() + 1;
                }
            }
        }
        //set new id
        newUser.setId(newId);

        //initialize empty lists
        if (newUser.getAllergiesList() == null){
            newUser.setAllergiesList(new ArrayList<>());
        }
        if (newUser.getDietsList() == null){
            newUser.setDietsList(new ArrayList<>());
        }
        if (newUser.getLikedRecipes() == null){
            newUser.setLikedRecipes(new ArrayList<>());
        }

        User[] updatedUsers  = new User [existingUsers.length + 1];

        for (int i = 0; i < existingUsers.length; i++){
            updatedUsers[i] = existingUsers[i];
        }

        updatedUsers[existingUsers.length] = newUser; //add new user at the end

        //add the updated array to the json
        oM.writerWithDefaultPrettyPrinter().writeValue(userData, updatedUsers);

        return newUser;
    }
}
