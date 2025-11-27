package com.ud11.groceries.services.Users;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

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
}
