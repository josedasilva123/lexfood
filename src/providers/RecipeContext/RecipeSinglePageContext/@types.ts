import { iRecipe } from "../@types";

export interface iRecipeGetOneResponse {
   recipe: iRecipe;
}

export interface iReviewFormValues{
    content: string;
    score: string;
}

export interface iReview{
    _id: string;
    userId: string;
    userName: string;
    recipeId: string;
    content: string;
    score: number;
}

export interface iReviewCreateResponse{
    review: iRecipe;
    message: string;
}

export interface iReviewDeleteResponse{
    message: string;
}
