package com.ud11.groceries.controllers.Example;
import com.ud11.groceries.classes.Example.ExampleColor;
import io.swagger.v3.oas.annotations.media.Schema;


public record GetExampleClassDto(
        @Schema(required=true)
        String message,
        @Schema(required=true)
        ExampleColor color,
        @Schema(required=true)
        int numBlueBerries
) {}