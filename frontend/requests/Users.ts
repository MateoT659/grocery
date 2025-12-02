import { DEV_API_HOSTURL } from '@/.apiconfig.json';
import { PatchUserResponseDto, Recipe, User } from "@/build/api_types";

const USER_API_URL = `${DEV_API_HOSTURL}/user-api`;

export default async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${USER_API_URL}/get-users`);
  return await response.json();
}

export async function getUserById(userId: string): Promise<Recipe> {
  const response = await fetch(`${USER_API_URL}/get-user/${userId}`);
  return await response.json();
}

export async function updateLikedRecipes(userId: string, likedRecipeIds: number[]): Promise<PatchUserResponseDto> {
    const response = await fetch(`${USER_API_URL}/liked-recipes/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likedRecipeIds),
    });

    return await response.json();
}



