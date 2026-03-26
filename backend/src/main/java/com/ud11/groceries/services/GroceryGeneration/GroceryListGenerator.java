package com.ud11.groceries.services.GroceryGeneration;

import com.ud11.groceries.classes.GroceryList.GroceryList;
import com.ud11.groceries.classes.GroceryList.ListIngredientWrapper;
import com.ud11.groceries.classes.GroceryList.ListRecipeWrapper;
import com.ud11.groceries.classes.Ingredient.IngredientHelper;
import com.ud11.groceries.classes.Recipe.Recipe;
import com.ud11.groceries.classes.Recipe.RecipeHelper;
import com.ud11.groceries.classes.Recipe.SimpleRecipe;
import com.ud11.groceries.classes.Unit;
import com.ud11.groceries.services.GroceryLists.GroceryListRetriever;
import com.ud11.groceries.services.IngredientRetriever;
import com.ud11.groceries.services.Recipes.RecipeRetriever;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class GroceryListGenerator {

    public static final int MAX_N_RECIPES = 20;

    public GroceryList generateGroceryList(GenerateGroceryListDto args) throws IOException {
        if(args.nRecipes() <= 0){
            throw new IllegalArgumentException("Number of recipes must be greater than 0");
        }
        else if(args.nRecipes()> MAX_N_RECIPES){
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
        simpleRecipes = getOverlappingRecipes(simpleRecipes, allSimpleRecipes);

        // DEBUG
        scoreOverlap(simpleRecipes, true);
        RecipeRetriever recipeRetriever = new RecipeRetriever();
        for(SimpleRecipe recipe : simpleRecipes){
            System.out.println(recipeRetriever.fetchRecipe(recipe.getRecipeId()).getName());
        }
        // ---

        // process into grocery list
        GroceryListRetriever glr = new GroceryListRetriever();
        IngredientRetriever ir = new IngredientRetriever();

        GroceryList newGroceryList = args.groceryListArgs();
        newGroceryList.setId(glr.getNextId());

        HashSet<Long> ingredientIdsSet = new HashSet<>();
        IngredientHelper ingredientHelper = new IngredientHelper();
        for (SimpleRecipe recipe : simpleRecipes) {
            if (recipe == null) continue;
            newGroceryList.getRecipes().add(new ListRecipeWrapper(recipe.getRecipeId(), recipeRetriever.fetchRecipe(recipe.getRecipeId()).getName()));
            for (long ingredientId : recipe.getIngredientIds()) {
                if (!ingredientIdsSet.contains(ingredientId))  {
                    ListIngredientWrapper ingredientWrapper = ingredientHelper.wrapIngredientForList(
                        ir.fetchIngredient(ingredientId),
                        1,
                        "",
                        false,
                        Unit.GRAM,
                        new ArrayList<>(Arrays.asList(recipe.getRecipeId()))
                    );


                    newGroceryList.getItems().add(ingredientWrapper);
                    ingredientIdsSet.add(ingredientId);
                }
                else{
                    for (ListIngredientWrapper listIngredient : newGroceryList.getItems()) {
                        if (listIngredient.ingredientId() == ingredientId) {
                            listIngredient.fromRecipesIds().add(recipe.getRecipeId());
                            break;
                        }
                    }
                }
            }
        }

        return newGroceryList;
    }


    public SimpleRecipe[] getOverlappingRecipes(SimpleRecipe[] recipes, SimpleRecipe[] allRecipes){
        double bestScore = scoreOverlap(recipes, false);
        double score;
        int skipCount = 0;
        SimpleRecipe[] bestRecipes = recipes.clone();
        //loop through each recipe in the list, replace it with every other candidate recipe, keep candidate with best score
        for(int iterations = 0; iterations < 2; iterations++) {
            for(int i = 1; i<recipes.length; i++){
                for (SimpleRecipe candidate : allRecipes) {
                    if(Arrays.stream(recipes).toList().contains(candidate)){
                        //skipping ID already in list
                        continue;
                    }
                    recipes[i] = candidate;
                    score = scoreOverlap(recipes, false);
                    if(score > bestScore){
                        bestScore = score;
                        bestRecipes[i] = recipes[i];
                    }

                }
                recipes[i] = bestRecipes[i];
            }
        }

        return bestRecipes;
    }

    public double scoreOverlap(SimpleRecipe[] recipes, boolean debug){
        HashMap<Long, Integer> ingredientIdsMap = new HashMap<>();
        int totalIngredients = 0;
        for (SimpleRecipe recipe : recipes) {
            if (recipe == null) continue;
            for (long ingredientId : recipe.getIngredientIds()) {
                ingredientIdsMap.put(ingredientId, ingredientIdsMap.getOrDefault(ingredientId, 0) + 1);
                totalIngredients++;
            }
        }
        IngredientRetriever ir = new IngredientRetriever();
        double overlapScore = 0;
        for (Map.Entry<Long, Integer> entry : ingredientIdsMap.entrySet()) {
            int count = entry.getValue();
            if (count > 1) {
                if(debug) {
                    try {
                        System.out.println("" + ir.fetchIngredient(entry.getKey()).name() + " appears " + count + " times.");
                    } catch (IOException e) {
                        System.out.println("Could not fetch ingredient for scoring: " + e.getMessage());
                    }
                }
                overlapScore += count - 1;
            }
            else{
                overlapScore -= 1;
            }
        }
        return (overlapScore);
    }


}
