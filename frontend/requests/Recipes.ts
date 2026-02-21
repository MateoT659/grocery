import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { Recipe, User } from "@/build/api_types";

const RECIPE_API_URL = `${DEV_API_HOSTURL}/recipe-api`;

export default async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipes`);
  return await response.json();
}

export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipe/${recipeId}`);
  return await response.json();
}

export async function getRecipeRecs(user: User): Promise<Recipe[]> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipe-recs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  
  return await response.json();
}
export async function patchRecipe(id: number, updates: any){
  const response = await fetch(`${RECIPE_API_URL}/update-recipe/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return response.json();

}