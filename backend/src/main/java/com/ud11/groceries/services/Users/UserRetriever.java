package com.ud11.groceries.services.Users;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class UserRetriever {
    public static String USER_DATA_PATH = "src/main/java/com/ud11/groceries/data/Users.json";

    public User[] fetchAllUsers() throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(USER_DATA_PATH);
        return oM.readValue(file, User[].class);
    }

    public User fetchUser(long id) throws IOException {
        ObjectMapper oM = new ObjectMapper();
        File file = new File(USER_DATA_PATH);
        User[] users = oM.readValue(file, User[].class);
        for (User user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        throw new IOException("User with id "+id+" not found");
    }
}
