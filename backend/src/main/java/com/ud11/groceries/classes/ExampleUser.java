package com.ud11.groceries.classes;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;

public record ExampleUser (
    @Schema(required=true)
    String firstName,
    @Schema(required=true)
    String lastName,
    @Schema(required=true)
    String username,
    @Schema(required=true)
    String password,
    @Schema(required=true)
    ArrayList allergiesList,
    @Schema(required=true)
    ArrayList dietsList
){}
