import { iReviewFormValues } from "../../../components/Form/ReviewCreateForm/@types";
import { iRecipe } from "../@types";

export interface iRecipeGetOneResponse {
   recipe: iRecipe;
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

export interface iRecipeSinglePageContext{
    recipe: iRecipe | undefined;
    recipeLoading: boolean;
    addReviewToRecipe: (formData: iReviewFormValues) => void;
    removeReviewFromRecipe: (reviewId: string) => void;
    editReviewFromRecipe: (formData: iReviewFormValues, reviewId: string) => void;
}
