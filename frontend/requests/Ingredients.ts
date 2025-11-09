import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { Ingredient, Recipe } from "@/build/api_types";

const INGREDIENT_API_URL = `${DEV_API_HOSTURL}/ingredient-api`;

export default async function getAllIngredients(): Promise<Ingredient[]> {
  const response = await fetch(`${INGREDIENT_API_URL}/get-ingredients`);
  return await response.json();
}

export async function getIngredientById(ingredientId: string): Promise<Ingredient> {
  const response = await fetch(`${INGREDIENT_API_URL}/get-ingredient/${ingredientId}`);
  return await response.json();
}

export async function getIngredientsFromRecipe(recipe: Recipe): Promise<Ingredient[]> {
  const ingredients = getAllIngredients();
  const ingredientIds = recipe.ingredients.map(riw => riw.ingredientId);
  return (await ingredients).filter(ingredient => ingredientIds.includes(ingredient.id));
}