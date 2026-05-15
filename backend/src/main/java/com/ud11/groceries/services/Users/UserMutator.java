package com.ud11.groceries.services.Users;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

@Service
public class UserMutator {
    public static String USER_DATA_PATH = "src/main/java/com/ud11/groceries/data/Users.json";

    UserRetriever uR;
    File userData;
    ObjectMapper oM;

    public UserMutator() throws IOException {
        oM = new ObjectMapper();
        userData = new File(USER_DATA_PATH);
        uR = new UserRetriever();
    }

    // update the information of a single user
    public User updateUser(long id, User updatedUser) throws IOException {
        User[] users = uR.fetchAllUsers();

        // Find the user with the specified ID and update it
        boolean found = false;
        for (int i = 0; i < users.length; i++) {
            if (users[i].getId() == id) {
                users[i] = updatedUser;
                found = true;
                break;
            }
        }

        if (!found) {
            throw new IOException("User with id " + id + " not found");
        }

        // Write the updated array back to the JSON file
        oM.writerWithDefaultPrettyPrinter().writeValue(userData, users);

        return updatedUser;
    }

    //  Deletes a user by their ID.
    public void deleteUser(long id) throws IOException {
        // Fetch all users
        User[] users = uR.fetchAllUsers();

        ArrayList<User> updatedUsers = new ArrayList<>();
        boolean found = false;
        // Remove the matching user
        for (User user : users) {
            if (user.getId() == id) {
                found = true;
            } else {
                updatedUsers.add(user);
            }
        }
        // Throw error if user does not exist
        if (!found) {
            throw new IOException("User with id " + id + " not found");
        }
        // Save updated users list
        oM.writerWithDefaultPrettyPrinter().writeValue(userData, updatedUsers);
    }

    // add/remove recipes from likedRecipes
    public User updateLikedRecipes(long id, ArrayList<Long> likedRecipeIds) throws IOException {
        User[] users = uR.fetchAllUsers();

        User targetUser = null;
        // Find the user with the specified ID and update it
        for (int i = 0; i < users.length; i++) {
            if (users[i].getId() == id) {
                targetUser = users[i];
                break;
            }
        }

        if (targetUser == null) {
            throw new IOException("User with id " + id + " not found");
        }

        // Get current list of liked recipes
        ArrayList<Long> currLikedRecipeIds = targetUser.getLikedRecipes();
        if (currLikedRecipeIds == null) {
            currLikedRecipeIds = new ArrayList<>();
            targetUser.setLikedRecipes(currLikedRecipeIds);
        }

        // add/remove the recipe that was liked/unliked from the list of likedRecipeIds
        for (long recipeId : likedRecipeIds) {
            if (currLikedRecipeIds.contains(recipeId)) {
                currLikedRecipeIds.remove(recipeId);
            }
            else {
                currLikedRecipeIds.add(recipeId);
            }
        }

        // Write the updated array back to the JSON file
        oM.writerWithDefaultPrettyPrinter().writeValue(userData, users);

        return targetUser;

    }
}
