package com.ud11.groceries.controllers.ClassPassing;

import org.springframework.web.bind.annotation.*;


/**
 * Controller for passing common class definitions to the frontend. Temporary for development.
 */
@RestController
@RequestMapping("/class-package-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class ClassPackageController {
    @PutMapping("/class-package")
    public void getClassPackage(@RequestBody ClassPackageDto classPackageDto) {
        // Currently does nothing, just a placeholder to send class definitions
    }

}
