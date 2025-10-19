package com.ud11.groceries.controllers.Example;

import com.ud11.groceries.classes.ExampleColor;
import io.swagger.v3.oas.annotations.media.Schema;

// DTO (Data Transfer Object) for PUT requests to update ExampleClass
public record PutExampleClassDto(
        @Schema(required=true)
        int numBlueBerries
) {}