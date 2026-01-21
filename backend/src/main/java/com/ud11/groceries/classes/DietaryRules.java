package com.ud11.groceries.classes;

import java.util.List;
import java.util.Map;

public class DietaryRules {
    public static final Map<Allergies, List<String>> allergyForbiddenIngredients = Map.of(
            Allergies.DAIRY, List.of("milk", "cheese", "parmesan", "mozzarella", "ricotta", "provolone", "butter", "cream", "sour cream", "yogurt", "whey", "parmesan"),
            Allergies.EGGS, List.of("egg", "eggs", "egg whites", "mayonnaise"),
            Allergies.SHELLFISH, List.of("shrimp", "crab", "lobster", "scallops", "mussel"),
            Allergies.PEANUTS, List.of("peanut", "peanuts", "peanut oil", "peanut butter"),
            Allergies.SOYBEANS, List.of("soybeans", "edamame", "tofu", "tempeh", "natto", "soy sauce", "dark soy sauce"),
            Allergies.FISH, List.of("fish", "fish sauce"),
            Allergies.TREE_NUTS, List.of("almonds", "cashews", "walnuts", "pecans"),
            Allergies.LACTOSE, List.of("milk", "cheese", "yogurt", "ice cream", "ricotta"),
            Allergies.SESAME_SEEDS, List.of("sesame", "hummus", "tahini")

    );

    public static final Map<Diets, List<String>> dietForbiddenIngredients = Map.of(
            Diets.VEGETARIAN, List.of("meat", "bacon", "taylor ham", "steak", "chicken", "beef", "pork", "fish", "shrimp", "lamb", "stock", "fish sauce", "chorizo", "sausage", "pepperoni", "prosciutto"),
            Diets.VEGAN, List.of("meat", "steak", "taylor ham", "chicken", "beef", "pork", "stock", "fish", "shrimp", "lamb", "cheese", "sour cream", "butter", "milk", "provolone", "parmesan", "mozzarella", "ricotta", "cream", "yogurt", "whey", "egg", "eggs", "egg whites", "mayonnaise", "honey", "fish sauce", "bone", "chorizo", "sausage", "pepperoni", "prosciutto"),
            Diets.PESCATARIAN, List.of("chicken", "beef", "pork", "lamb"),
            Diets.KOSHER, List.of("pork", "taylor ham", "pepperoni", "prosciutto", "ham", "bacon", "sausage", "chorizo", "shrimp", "crab", "lobster", "scallops"),
            Diets.HALAL, List.of("pork", "taylor ham", "pepperoni", "ham", "prosciutto", "bacon", "sausage", "chorizo", "shaoxing wine", "marsala wine", "white wine", "sausage" ),
            Diets.GLUTEN_FREE, List.of("flour", "breadcrumb", "bread", "bread crumb", "english muffin" )
    );
}
