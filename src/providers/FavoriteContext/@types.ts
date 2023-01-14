import { iRecipe } from "../RecipeContext/@types";
import { iFavoriteRecipe } from "../UserContext/@types";

export interface iFavoriteCreateResponse {
   message: string;
}

export interface iFavoriteDeleteResponse {
   message: string;
}

export interface iFavoriteContext {
   favoriteRecipes: iFavoriteRecipe[] | undefined;
   favoriteModal: boolean;
   setFavoriteModal: React.Dispatch<React.SetStateAction<boolean>>;
   addRecipeToFavoriteList: (recipe: iRecipe) => void;
   removeRecipeFromFavoriteList: (recipeId: string) => void;
}
