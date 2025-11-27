package com.ud11.groceries.services;

import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeIngredientWrapper;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SearchRetriever {

    /**
     * Search method that looks at Recipe Names and Ingredients.
     * Arguments:
     * query: The user's search string (e.g., "Beef")
     * allRecipes: The dataset to search through
     */
    public List<Recipe> searchRecipes(String query, Recipe[] allRecipes) {
        List<Recipe> matches = new ArrayList<>();

        if (query == null || query.isEmpty()) {
            return matches;
        }

        // Normalize query to lower case for case-insensitive search
        String pattern = query.toLowerCase();

        for (Recipe recipe : allRecipes) {
            boolean isMatch = false;

            // 1. Check Recipe Name
            // specific check to avoid NullPointer if a name is missing
            if (recipe.getName() != null && rabinKarpSearch(pattern, recipe.getName().toLowerCase())) {
                isMatch = true;
            }

            // 2. If name didn't match, Check Ingredients
            // We iterate through RecipeIngredientWrapper because that holds the display name
            if (!isMatch && recipe.getIngredients() != null) {
                for (RecipeIngredientWrapper wrapper : recipe.getIngredients()) {

                    // Check the ingredientDisplayName (e.g., "Beef", "Pita Bread")
                    if (wrapper.ingredientDisplayName() != null &&
                            rabinKarpSearch(pattern, wrapper.ingredientDisplayName().toLowerCase())) {
                        isMatch = true;
                        break; // Found a match in this recipe, stop checking ingredients
                    }

                    // Optional: You could also search the 'notes' field
                    // (e.g., finding "melted" in "melted butter")
                    if (wrapper.notes() != null &&
                            rabinKarpSearch(pattern, wrapper.notes().toLowerCase())) {
                        isMatch = true;
                        break;
                    }
                }
            }

            if (isMatch) {
                matches.add(recipe);
            }
        }
        return matches;
    }

    /**
     * Standard Rabin-Karp Algorithm for string matching.
     * Returns true if 'pattern' is found inside 'text'.
     */
    private boolean rabinKarpSearch(String pattern, String text) {
        int m = pattern.length();
        int n = text.length();

        if (m > n) return false;

        long prime = getBiggerPrime(m);
        long r = 1;
        for (int i = 0; i < m - 1; i++) {
            r = (r * 256) % prime;
        }

        long t = 0;
        long p = 0;

        for (int i = 0; i < m; i++) {
            p = (256 * p + pattern.charAt(i)) % prime;
            t = (256 * t + text.charAt(i)) % prime;
        }

        for (int i = 0; i <= n - m; i++) {
            if (p == t) {
                boolean charMatch = true;
                for (int j = 0; j < m; j++) {
                    if (text.charAt(i + j) != pattern.charAt(j)) {
                        charMatch = false;
                        break;
                    }
                }
                if (charMatch) return true;
            }

            if (i < n - m) {
                t = (256 * (t - text.charAt(i) * r) + text.charAt(i + m)) % prime;
                if (t < 0) t = (t + prime);
            }
        }
        return false;
    }

    private long getBiggerPrime(int m) {
        return BigInteger.probablePrime(31, new Random()).longValue();
    }
}