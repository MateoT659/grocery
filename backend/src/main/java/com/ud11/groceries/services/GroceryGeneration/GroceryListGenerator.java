package com.ud11.groceries.services.GroceryGeneration;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.Ingredient.IngredientHelper;
import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeHelper;
import com.ud11.groceries.classes.Recipe.SimpleRecipe;
import com.ud11.groceries.services.GroceryLists.GroceryListRetriever;
import com.ud11.groceries.services.IngredientRetriever;
import com.ud11.groceries.services.RecipeRetriever;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Random;

@Service
public class GroceryListGenerator {

    public GroceryList generateGroceryList(GenerateGroceryListDto args) throws IOException {
        if(args.nRecipes() <= 0){
            throw new IllegalArgumentException("Number of recipes must be greater than 0");
        }
        else if(args.nRecipes()>20){
            throw new IllegalArgumentException("Number of recipes too high");
        }

        // get random set of N of recipes
        RecipeRetriever rr = new RecipeRetriever();

        Recipe[] allRecipes = rr.fetchAllRecipes();

        RecipeHelper rh = new RecipeHelper();
        SimpleRecipe[] allSimpleRecipes = new SimpleRecipe[allRecipes.length];
        for(int i = 0; i<allRecipes.length; i++){
            allSimpleRecipes[i] = rh.getSimpleRecipe(allRecipes[i]);
        }

        SimpleRecipe[] simpleRecipes = new SimpleRecipe[args.nRecipes()];

        Random r = new Random();

        HashSet<Integer> usedIndices = new HashSet<>();
        int index = r.nextInt((allRecipes.length));
        for(int i = 0; i<args.nRecipes(); i++){
            while(usedIndices.contains(index)){
                index = r.nextInt(allRecipes.length);
            }
            simpleRecipes[i] = allSimpleRecipes[index];
            usedIndices.add(index);
        }

        // generation logic
        for(SimpleRecipe recipe : simpleRecipes){
            System.out.println(recipe.getRecipeId());
        }
        simpleRecipes = getOverlappingRecipes(simpleRecipes, allSimpleRecipes);

        RecipeRetriever recipeRetriever = new RecipeRetriever();

        for(SimpleRecipe recipe : simpleRecipes){
            System.out.println(recipeRetriever.fetchRecipe(recipe.getRecipeId()).getName());
        }

        GroceryListRetriever glr = new GroceryListRetriever();
        // process into grocery list
        GroceryList newGroceryList = args.groceryListArgs();

        newGroceryList.setId(glr.getNextId());
        IngredientRetriever ir = new IngredientRetriever();

        HashSet<Long> ingredientIdsSet = new HashSet<>();
        IngredientHelper ingredientHelper = new IngredientHelper();
        for (SimpleRecipe recipe : simpleRecipes) {
            if (recipe == null) continue;
            for (long ingredientId : recipe.getIngredientIds()) {
                if (!ingredientIdsSet.contains(ingredientId))  {
                    newGroceryList.getItems().add(ingredientHelper.wrapIngredientForListDefaults(ir.fetchIngredient(ingredientId)));
                    ingredientIdsSet.add(ingredientId);
                }
            }
        }

        return newGroceryList;
    }


    public SimpleRecipe[] getOverlappingRecipes(SimpleRecipe[] recipes, SimpleRecipe[] allRecipes){
        int bestScore = scoreOverlap(recipes);
        SimpleRecipe[] bestRecipes = recipes.clone();
        int score;
        for(int i = 1; i<recipes.length; i++){
            for (SimpleRecipe candidate : allRecipes) {
                if(Arrays.stream(recipes).toList().contains(candidate)){
                    System.out.println("skipping used id "+candidate.getRecipeId());
                    continue;
                }
                recipes[i] = candidate;
                score = scoreOverlap(recipes);
                if(score > bestScore){
                    bestScore = score;
                    bestRecipes[i] = candidate;
                }

            }
            recipes[i] = bestRecipes[i];
        }
        return recipes;
    }

    public int scoreOverlap(SimpleRecipe[] recipes){
        HashSet<Long> ingredientIdsSet = new HashSet<>();
        int totalIngredients = 0;
        for (SimpleRecipe recipe : recipes) {
            if (recipe == null) continue;
            for (long ingredientId : recipe.getIngredientIds()) {
                ingredientIdsSet.add(ingredientId);
                totalIngredients++;
            }
        }
        return totalIngredients - ingredientIdsSet.size();
    }


}
