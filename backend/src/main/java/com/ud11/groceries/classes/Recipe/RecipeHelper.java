package com.ud11.groceries.classes.Recipe;

import com.ud11.groceries.classes.Allergies;
import com.ud11.groceries.classes.Diets;
import com.ud11.groceries.classes.Ingredient.Ingredient;
import com.ud11.groceries.services.IngredientRetriever;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class RecipeHelper {

    IngredientRetriever ir;

    public RecipeHelper() throws IOException {
        this.ir = new IngredientRetriever();
    }

    public RecipeHelper(IngredientRetriever ir){
        this.ir = ir;
    }

    public SimpleRecipe getSimpleRecipe(Recipe recipe){
        ArrayList<Long> ingredientIDs = new ArrayList<>();
        for (RecipeIngredientWrapper riw : recipe.getIngredients()) {
            ingredientIDs.add(riw.ingredientId());
        }
        return new SimpleRecipe(recipe.getId(), ingredientIDs);
    }

    public ArrayList<Ingredient> getIngredientsFromRecipe(Recipe recipe) throws IOException{
        ArrayList<Ingredient> ingredients = new ArrayList<>();
        for (RecipeIngredientWrapper riw : recipe.getIngredients()) {
            ingredients.add(ir.fetchIngredient(riw.ingredientId()));
        }
        return ingredients;
    }

    public ArrayList<Ingredient> getIngredientsFromSimpleRecipe(SimpleRecipe recipe) throws IOException{
        ArrayList<Ingredient> ingredients = new ArrayList<>();
        for (long ingredientId : recipe.getIngredientIds()) {
            ingredients.add(ir.fetchIngredient(ingredientId));
        }
        return ingredients;
    }

    //TODO: mateotorres - optimize these so you arent calling getIngredientsFromRecipe() more than once.
    public boolean suitableForDiet(Recipe recipe, Diets diet) throws IOException{
        //each ingredient in the recipe must have the diet it ints list.
        for( Ingredient ingredient: getIngredientsFromRecipe(recipe)){
            if (!ingredient.diets().contains(diet)){
                return false;
            }
        }
        return true;
    }

    public boolean suitableForAllDiets(Recipe recipe, ArrayList<Diets> diets) throws IOException{
        //when filtering by diets, the recipe must be suitable for all diets in the list.
        for(Diets diet : diets){
            if(!suitableForDiet(recipe, diet)){
                return false;
            }
        }
        return true;
    }

    public boolean containsAllergen(Recipe recipe, Allergies allergen) throws IOException {
        // any ingredient in the recipe can contain the allergen, contaminating the whole.
        for( Ingredient ingredient: getIngredientsFromRecipe(recipe)){
            if(ingredient.allergens().contains(allergen)){
                return true;
            }
        }
        return false;
    }

    public boolean containsAnyAllergen(Recipe recipe, ArrayList<Allergies> allergens) throws IOException {
        // when filtering by allergens, the recipe must not contain any of the allergens in the list.
        for(Allergies allergen : allergens){
            if(containsAllergen(recipe, allergen)){
                return true;
            }
        }
        return false;
    }
}
