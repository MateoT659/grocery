package com.ud11.groceries.controllers.ClassPassing;

import com.ud11.groceries.classes.*;

public record ClassPackageDto (
        //contains all classes for frontend use
        Allergies allergies,
        Diets diets,
        Ingredient ingredient,
        Unit unit,
        User user
){}
