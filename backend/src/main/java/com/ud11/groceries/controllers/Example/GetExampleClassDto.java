package com.ud11.groceries.controllers.Example;
import com.ud11.groceries.classes.Example.ExampleColor;
import io.swagger.v3.oas.annotations.media.Schema;


public record GetExampleClassDto(
        String message,
        ExampleColor color,
        int numBlueBerries
) {}