package com.ud11.groceries.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Example controller to demonstrate how rest apis work with springboot
 * Called in app/(tabs)/index.tsx
 */

@RestController
@RequestMapping("/example-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class ExampleController {
    // receive from "example-api/get-data"
    @GetMapping("/get-data")
    public Map<String, String> sendExample(){
        Map<String, String> data = new HashMap<>();
        data.put("message", "Hello from the backend!");
        data.put("color", "blue");
        return data;
    }
}
