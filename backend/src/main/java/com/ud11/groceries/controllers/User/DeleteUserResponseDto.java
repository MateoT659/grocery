package com.ud11.groceries.controllers.User;

import lombok.Getter;
import lombok.Setter;
/**
 * Response DTO used after attempting to delete a user account.
 * Contains the operation status and a related message.
 */
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
