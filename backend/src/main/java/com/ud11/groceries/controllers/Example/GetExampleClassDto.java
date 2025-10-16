package com.ud11.groceries.controllers.Example;
import com.ud11.groceries.classes.ExampleColor;


public record GetExampleClassDto(
        String message,
        ExampleColor color,
        int numBlueBerries
) {}