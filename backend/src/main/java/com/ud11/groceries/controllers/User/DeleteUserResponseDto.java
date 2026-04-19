package com.ud11.groceries.controllers.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteUserResponseDto {
    private boolean success;
    private String message;

    public DeleteUserResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
