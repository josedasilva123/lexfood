import { iRecipe } from "../@types";

export interface iRecipeGetResponse {
   count: number;
   recipes: iRecipe[];
}

export interface iRecipePageContext {
   recipeList: iRecipe[] | undefined;
   recipeListLoading: boolean;
   filteredRecipeList: iRecipe[] | undefined;
   filter: string;
   setFilter: React.Dispatch<React.SetStateAction<string>>;
   search: string;
   setSearch: React.Dispatch<React.SetStateAction<string>>;
}
