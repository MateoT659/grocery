import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { Recipe } from "@/build/api_types";

const RECIPE_API_URL = `${DEV_API_HOSTURL}/recipe-api`;

export default async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipes`);
  return await response.json();
}

export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipe/${recipeId}`);
  return await response.json();
}