package com.ud11.groceries.controllers.User;


import com.ud11.groceries.classes.User;
import com.ud11.groceries.services.Users.CreateUser;
import com.ud11.groceries.services.Users.UserMutator;
import com.ud11.groceries.services.Users.UserRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.apache.commons.validator.routines.EmailValidator;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/user-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class UserController {

    @Autowired
    private UserRetriever userRetriever;
    @Autowired
    private UserMutator userMutator;
    @Autowired
    private CreateUser createUser;

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
//    @PatchMapping("/liked-recipes/{id}")
//    public PatchUserResponseDto updateLikedRecipes(@PathVariable long id, @RequestBody ArrayList<Long> likedRecipeIds) throws IOException {
//        User updated;
//
//        try {
//            updated = userMutator.updateLikedRecipes(id, likedRecipeIds);
//        }
//        catch (IOException e) {
//            return new PatchUserResponseDto(false, e.getMessage(), null);
//        }
//        return new PatchUserResponseDto(true, "", updated);
//    }

    // update user fields based on user id
    @PatchMapping("/users/{id}")
    public PatchUserResponseDto updateUserField(@PathVariable long id, @RequestBody UpdateUserDto updatedUser) throws IOException {
        try {
            User user = userRetriever.fetchUser(id);

            if (updatedUser.getName() != null) {
                user.setName(updatedUser.getName());
            }
            if (updatedUser.getUsername() != null) {
                user.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPassword() != null) {
                user.setPassword(updatedUser.getPassword());
            }
            if (updatedUser.getAllergiesList() != null) {
                user.setAllergiesList(updatedUser.getAllergiesList());
            }
            if (updatedUser.getDietsList() != null) {
                user.setDietsList(updatedUser.getDietsList());
            }
            if (updatedUser.getLikedRecipes() != null) {
                user.setLikedRecipes(updatedUser.getLikedRecipes());
            }

            User updated = userMutator.updateUser(id, user);
            return new PatchUserResponseDto(true, "", updated);
        }
        catch (IOException e){
            return new PatchUserResponseDto(false, e.getMessage(), null);
        }

    }

    @PostMapping("/login")
    public User login(@RequestBody PostUserLoginInputDto loginInput) throws IOException {
        User user = userRetriever.fetchUserByUsername(loginInput.getUsernameInput());

        if (user == null || !user.getPassword().equals(loginInput.getPasswordInput())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials.");
        }

        return user;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody PostUserSignupInputDto signupInput) throws IOException{
        EmailValidator validator = EmailValidator.getInstance();
       if (signupInput.getEmailInput() == null || !validator.isValid(signupInput.getEmailInput())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email address.");
        }

        if (signupInput.getUsernameInput()== null || signupInput.getUsernameInput().trim().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required.");
        }

        //password is error not showing up!
        if (signupInput.getPasswordInput() == null || signupInput.getPasswordInput().length() < 5 ) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 5 characters.");
        }

        //username already exists
        User existingUser = userRetriever.fetchUserByUsername(signupInput.getUsernameInput());
        if (existingUser != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists. Please use another username.");
        }

        //email already exists
        User existEmail = userRetriever.fetchUserByEmail(signupInput.getEmailInput());
        if (existEmail != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists. Please use another email address.");
        }

        // Create new user
        User newUser = new User();
        newUser.setUsername(signupInput.getUsernameInput());
        newUser.setEmail(signupInput.getEmailInput());
        newUser.setPassword(signupInput.getPasswordInput());
        newUser.setName(signupInput.getNameInput());

        return createUser.createUser(newUser);
    }
}
