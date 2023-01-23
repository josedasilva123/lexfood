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

export interface iRecipeCreateResponse {
   recipe: iRecipe;
   message: string;
}

export interface iRecipeContext {
   categoryList: iCategory[] | undefined; 
   categoryListLoading: boolean;  
   recipeCreate: (formData: FormData) => void;
}
