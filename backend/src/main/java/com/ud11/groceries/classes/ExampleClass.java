package com.ud11.groceries.classes;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ExampleClass {
    private String id; //private info not to be shown to the user
    private String message;
    private ExampleColor color;
    private int numBlueBerries;

    public ExampleClass(String id, String message, ExampleColor color, int numBlueBerries) {
        this.id = id;
        this.message = message;
        this.color = color;
        this.numBlueBerries = numBlueBerries;
    }
}
