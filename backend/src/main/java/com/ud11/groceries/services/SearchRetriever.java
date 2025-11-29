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

    public List<Recipe> searchHelper(String query, Recipe[] allRecipes){
        List<Recipe> matches = new ArrayList<>();
        if(query == null || query.isEmpty()){
            return matches;
        }
        String pattern = query.toLowerCase();

        for (Recipe recipe : allRecipes){
            boolean isMatch = false;

            if (recipe.getName() != null){
                if(RabinKarpMethod(pattern, recipe.getName().toLowerCase())){
                    isMatch = true;
                }
            }

            if (!isMatch && recipe.getIngredients() != null){
                for(RecipeIngredientWrapper wrapper: recipe.getIngredients()){
                    if (wrapper.ingredientDisplayName() != null){
                        if(RabinKarpMethod(pattern, wrapper.ingredientDisplayName().toLowerCase())){
                            isMatch = true;
                            break;
                        }
                    }
                }
            }

            if(isMatch){
                matches.add(recipe);
            }
        }
        return matches;
    }

    public boolean RabinKarpMethod(String pattern, String text) {
        //length of the arrays

        int patternSize = pattern.length();
        int textSize = text.length();

        if (patternSize > textSize)
            return false;
        //using prime number for fewer hash collision
        long prime = getBiggerPrime(patternSize);

        //precompute r=> later used to remove the left most char from the current window hash (2^m-1)%prime
        long r = 1;
        for (int i = 0; i < patternSize - 1; i++) {
            r *= 2;
            r = r % prime;
        }

        //create hash arrays
        long t = 0;
        long pfinger = 0;   //pattern's hash

        //build the first window hash and pattern hash
        for (int j = 0; j < patternSize; j++) {
            t = (2 * t + text.charAt(j)) % prime;
            pfinger = (2 * pfinger + pattern.charAt(j)) % prime;
        }

        int i = 0;
        boolean passed = false;

        int diff = textSize - patternSize;
        for (i = 0; i <= diff; i++) {
            // If fingerprints match, do a real character check
            if (t == pfinger) {
                passed = true;
                for (int k = 0; k < patternSize; k++) {
                    if (text.charAt(i + k) != pattern.charAt(k)) {
                        passed = false;
                        break;
                    }
                }

                if (passed) { //found the match
                    return true;
                }
            }
            //Prepare the hash for the next window (rolling hash)
            if (i < diff) {
                long value = 2 * (t - r * text.charAt(i)) + text.charAt(i + patternSize);
                t = ((value % prime) + prime) % prime;
            }
        }
        return false; //not found match
    }

    //choose a prime with bits+1 length
    private long getBiggerPrime(int m) {
        //getNumberOfBits= bit length of m
        BigInteger prime = BigInteger.probablePrime(getNumberOfBits(m) + 1, new Random());
        return prime.longValue();
    }

    //# of bites to represent int to binary
    private int getNumberOfBits(int number) {
        return Integer.SIZE - Integer.numberOfLeadingZeros(number);
    }


}