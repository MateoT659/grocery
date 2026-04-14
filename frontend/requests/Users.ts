import { DEV_API_HOSTURL } from "@/.apiconfig.json";
import {
  PostUserLoginInputDto,
  Recipe,
  UpdateUserDto,
  User,
} from "@/build/api_types";

const USER_API_URL = `${DEV_API_HOSTURL}/user-api`;

export default async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${USER_API_URL}/get-users`);
  return await response.json();
}

export async function getUserById(userId: string): Promise<Recipe> {
  const response = await fetch(`${USER_API_URL}/get-user/${userId}`);
  return await response.json();
}

// export async function updateLikedRecipes(userId: string, likedRecipeIds: number[]): Promise<PatchUserResponseDto> {
//     const response = await fetch(`${USER_API_URL}/liked-recipes/${userId}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(likedRecipeIds),
//     });

//     return await response.json();
// }

export async function updateUserFields(
  userId: number | undefined,
  updatedUser: Partial<UpdateUserDto>,
): Promise<User> {
  const response = await fetch(`${USER_API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  return await response.json();
}

export async function getUserPostLogin(
  loginInput: PostUserLoginInputDto,
): Promise<User> {
  const response = await fetch(`${USER_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInput),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return await response.json();
}

export async function deleteUser(
  userId: number,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${USER_API_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete user: ${response.status}`);
  }

  return await response.json();
}
