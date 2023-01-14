import { UseMutationResult } from "react-query";

export interface iCategory {
   _id: string;
   name: string;
   slug: string;
   createdAt: string;
   updatedAt: string;
}

export interface iRecipe {
   _id: string;
   userID: string;
   title: string;
   content: string;
   thumbnail_filename: string;
   thumbnail_url: string;
   categories: string[];
   createdAt: string;
   updatedAt: string;
}

export interface iCategoryGetResponse {
   categories: iCategory[];
}

export interface iRecipeGetResponse {
   count: number;
   recipes: iRecipe[];
}

export interface iRecipeCreateResponse {
   recipe: iRecipe;
   message: string;
}

export interface iRecipeContext {
   categoryList: iCategory[] | undefined;
   recipeList: iRecipe[] | undefined;
   filteredRecipeList: iRecipe[] | undefined;
   filter: string;
   setFilter: React.Dispatch<React.SetStateAction<string>>;
   search: string;
   setSearch: React.Dispatch<React.SetStateAction<string>>;
   recipeListLoading: boolean;
   recipeCreate: (formData: FormData) => void;
}
