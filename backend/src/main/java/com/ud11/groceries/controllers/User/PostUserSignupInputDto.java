package com.ud11.groceries.controllers.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUserSignupInputDto {
    String usernameInput;
    String nameInput;
    String passwordInput;
    String emailInput;

    public PostUserSignupInputDto(String usernameInput, String passwordInput, String emailInput, String nameInput) {
        this.usernameInput = usernameInput;
        this.passwordInput = passwordInput;
        this.emailInput = emailInput;
        this.nameInput = nameInput;
    }
}
