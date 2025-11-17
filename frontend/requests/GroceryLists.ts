import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { GroceryList } from "@/build/api_types";

const GROCERY_LIST_API_URL = `${DEV_API_HOSTURL}/grocery-list-api`;

export default async function getAllGroceryLists(): Promise<GroceryList[]> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/get-grocery-lists`);
  return await response.json();
}

export async function getGroceryListById(groceryListId: string): Promise<GroceryList> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/get-grocery-list/${groceryListId}`);
  return await response.json();
}