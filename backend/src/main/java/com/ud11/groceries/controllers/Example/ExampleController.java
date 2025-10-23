package com.ud11.groceries.controllers.Example;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ud11.groceries.classes.Example.ExampleClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

/**
 * Example controller to demonstrate how rest apis work with springboot
 * Called in app/(tabs)/index.tsx
 *
 * NOTE: include GET (read), POST (create), PUT (update), and DELETE (delete) options, update a JSON (using jackson)
 *
 * View all APIs in a dev view at http://localhost:8080/swagger-ui/index.html
 * The JSON Format for the API specification is at http://localhost:8080/v3/api-docs
 */

@RestController
@RequestMapping("/example-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class ExampleController {

    @Autowired
    private ObjectMapper objectMapper;

    private static String EXAMPLE_JSON_PATH = "src/main/java/com/ud11/groceries/data/Example/ExampleClass.json";

    @GetMapping("/get")
    public GetExampleClassDto getExample() throws IOException {
        File jsonFile = new File(EXAMPLE_JSON_PATH);
        ExampleClass exampleClass = objectMapper.readValue(jsonFile, ExampleClass.class);
        return new GetExampleClassDto(
                exampleClass.getMessage(),
                exampleClass.getColor(),
                exampleClass.getNumBlueBerries()
        );
    }
    @PutMapping("/put")
    public PutResponseExampleClassDto putExample(@RequestBody PutExampleClassDto putExampleClassDto) throws IOException{
        //check if request is valid
        if(putExampleClassDto.numBlueBerries() < 0){
            return new PutResponseExampleClassDto(false, "Number of blueberries cannot be negative.");
        }

        if(putExampleClassDto.numBlueBerries() > 5) {
            return new PutResponseExampleClassDto(false, "Number of blueberries cannot be greater than 5.");
        }

        // set the "blueberries" value to a new one
        File jsonFile = new File(EXAMPLE_JSON_PATH);
        ExampleClass exampleClass = objectMapper.readValue(jsonFile, ExampleClass.class);

        exampleClass.setNumBlueBerries(putExampleClassDto.numBlueBerries());

        objectMapper.writeValue(jsonFile, exampleClass);

        return new PutResponseExampleClassDto(true, "");
    }
}
