import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { Recipe } from "@/build/api_types";

const SEARCH_API_URL = `${DEV_API_HOSTURL}/search-api`;

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${SEARCH_API_URL}/search?${params.toString()}`);
  if (!response.ok) {
    console.error(`Search request failed with status ${response.status}`);
    return []; 
  }

  return await response.json();
}
