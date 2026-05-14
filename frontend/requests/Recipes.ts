import { DEV_API_HOSTURL } from "@/.apiconfig.json";
import {
  Allergies,
  CreateRecipeDto,
  Diets,
  Recipe,
  User,
} from "@/build/api_types";

const RECIPE_API_URL = `${DEV_API_HOSTURL}/recipe-api`;

export default async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipes`);
  return await response.json();
}

export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const response = await fetch(`${RECIPE_API_URL}/get-recipe/${recipeId}`);
  return await response.json();
}

// get request to backend to retrieve recipe recommendations for feedpage
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

// backend request to make changes to a recipe
export async function patchRecipe(id: number, updates: any) {
  const response = await fetch(`${RECIPE_API_URL}/update-recipe/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}

// backend request to create a recipe
export async function createRecipe(newRecipe: CreateRecipeDto) {
  const response = await fetch(`${RECIPE_API_URL}/create-new-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return await response.json();
}

// recipe filtering on feedpage
export async function filterRecipesForFeed(
  recipes: Recipe[],
  diets: Diets[],
  allergies: Allergies[],
): Promise<Recipe[]> {
  const response = await fetch(`${RECIPE_API_URL}/filter-recipes-for-feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipe: recipes,
      diets: diets,
      allergies: allergies,
    }),
  });

  return await response.json();
}
