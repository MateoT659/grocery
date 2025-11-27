package com.ud11.groceries.controllers.User;

import com.ud11.groceries.classes.User;

public record PutUserResponseDto(
    boolean success,
    String message,
    User user
) {}