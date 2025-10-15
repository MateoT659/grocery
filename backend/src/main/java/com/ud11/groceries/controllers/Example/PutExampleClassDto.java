package com.ud11.groceries.controllers.Example;

import com.ud11.groceries.classes.ExampleColor;

// DTO (Data Transfer Object) for PUT requests to update ExampleClass
public record PutExampleClassDto(
        int numBlueBerries
) {}