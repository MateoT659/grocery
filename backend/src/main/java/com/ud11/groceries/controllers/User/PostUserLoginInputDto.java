package com.ud11.groceries.controllers.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUserLoginInputDto {
    String usernameInput;
    String passwordInput;

    public PostUserLoginInputDto(String usernameInput, String passwordInput) {
        this.usernameInput = usernameInput;
        this.passwordInput = passwordInput;
    }
}
