import {
  Ingredient,
  ListIngredientWrapper,
  RecipeIngredientWrapper,
  Unit,
} from "@/build/api_types";

export function wrapIngredientForList(
  ingredient: Ingredient,
  quantity?: number,
  notes?: string,
  unit?: Unit,
): ListIngredientWrapper {
  return {
    ingredientId: ingredient.id,
    ingredientDisplayName: ingredient.name,
    unit: unit ?? ingredient.unit,
    quantity: quantity ?? 1,
    notes: notes ?? "",
    checked: false,
    fromRecipesIds: [],
  };
}

export function wrapIngredientForRecipe(
  ingredient: Ingredient,
  quantity?: number,
  notes?: string,
  optional?: boolean,
  unit?: Unit,
): RecipeIngredientWrapper {
  return {
    ingredientId: ingredient.id,
    ingredientDisplayName: ingredient.name,
    unit: unit ?? ingredient.unit,
    quantity: quantity ?? 1,
    notes: notes ?? "",
    optional: optional ?? false,
  };
}
