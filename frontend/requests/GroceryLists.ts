import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { DeleteGroceryListResponseDto, GroceryList, PostGroceryListResponseDto, PutGroceryListResponseDto } from "@/build/api_types";

const GROCERY_LIST_API_URL = `${DEV_API_HOSTURL}/grocery-list-api`;

export default async function getAllGroceryLists(): Promise<GroceryList[]> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/get-grocery-lists`);
  return await response.json();
}

export async function getGroceryListById(groceryListId: string): Promise<GroceryList> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/get-grocery-list/${groceryListId.toString()}`);
  return await response.json();
}

export async function setGroceryListById(groceryListId: string, updatedList: GroceryList): Promise<PutGroceryListResponseDto> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/put-grocery-list/${groceryListId.toString()}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedList),
  });
  return await response.json();
}

export async function addGroceryList(newList: GroceryList): Promise<PostGroceryListResponseDto> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/add-grocery-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });
  return await response.json();
}

export async function deleteGroceryListById(groceryListId: string): Promise<DeleteGroceryListResponseDto> {
  const response = await fetch(`${GROCERY_LIST_API_URL}/delete-grocery-list/${groceryListId.toString()}`, {
    method: 'DELETE',
  });
  return await response.json();
}