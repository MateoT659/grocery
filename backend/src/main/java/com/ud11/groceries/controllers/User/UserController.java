package com.ud11.groceries.controllers.User;


import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.Users.UserMutator;
import com.ud11.groceries.services.Users.UserRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class UserController {

    @Autowired
    private UserRetriever userRetriever;
    @Autowired
    private UserMutator userMutator;

    //get all users at once
    @GetMapping("/get-users")
    public User[] getUsers() throws IOException {
        return userRetriever.fetchAllUsers();
    }

    //get a user by id
    @GetMapping("/get-user/{id}")
    public User getUser(@PathVariable long id) throws IOException {
        return userRetriever.fetchUser(id);
    }

    //update a specific user by id
    @PutMapping("/put-user/{id}")
    public PutUserResponseDto putUser(@PathVariable long id, @RequestBody User user) throws IOException {
        User updated;

        try {
            updated = userMutator.updateUser(id, user);
        }
        catch (IOException e) {
            return new PutUserResponseDto(false, e.getMessage(), null);
        }
        return new PutUserResponseDto(true, "", updated);
    }




}
