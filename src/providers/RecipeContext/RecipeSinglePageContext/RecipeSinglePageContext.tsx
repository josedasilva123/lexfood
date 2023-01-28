import { AxiosError } from "axios";
import { createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import { iContextProviderProps, iDefaultErrorResponse } from "../../@types";
import { iRecipe } from "../@types";
import { iRecipeGetOneResponse, iReviewCreateResponse, iReviewDeleteResponse, iReviewFormValues } from "./@types";

export const RecipeSinglePageContext = createContext({});

export const RecipeSinglePageProvider = ({ children }: iContextProviderProps) => {
   const { recipeId } = useParams();
   const queryClient = useQueryClient();

   const { data: recipe, isLoading: recipeLoading } = useQuery({
      queryKey: ["recipe"],
      queryFn: async () => {
         try {
            const token = localStorage.getItem("@TOKEN");
            const response = await api.get<iRecipeGetOneResponse>(`recipe/${recipeId}`, {
               headers: {
                  auth: token,
               },
            });
            return response.data.recipe;
         } catch (error) {
            console.log(error);
         }
      },
   });

   const addReviewToRecipeMutation = useMutation({
      mutationFn: async ({ review }: { review: iReviewFormValues }) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const newReview = { ...review, score: +review.score, recipeId: recipe?._id };

            const response = await api.post<iReviewCreateResponse>("review", newReview, {
               headers: {
                  auth: token,
               },
            });

            return response.data;
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            throw new Error(currentError.response?.data.error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData("recipe", (currentData) => {
            const currentRecipe = currentData as iRecipe;
            const newRecipe = { ...currentRecipe, reviews: [...currentRecipe.reviews, data.review] };
            return newRecipe;
         });
         toast.success(data.message);
      },
      onError: (error) => {
         toast.error(error as string);
      },
   });

   const addReviewToRecipe = (review: iReviewFormValues) => {
      addReviewToRecipeMutation.mutate({ review });
   };

   const removeReviewFromRecipeMutation = useMutation({
      mutationFn: async ({ reviewId }: { reviewId: string }) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const response = await api.delete<iReviewDeleteResponse>(`review/${recipe?._id}/${reviewId}`, {
               headers: {
                  auth: token,
               },
            });

            return { reviewId, message: response.data.message };
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            throw new Error(currentError.response?.data.error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData("recipe", (currentData) => {
            const currentRecipe = currentData as iRecipe;
            const newReviewList = currentRecipe.reviews.filter((review) => review._id !== data.reviewId);
            return { ...currentRecipe, reviews: newReviewList };
         });
         toast.success(data.message);
      },
      onError: (error) => {
         toast.error(error as string);
      },
   });

   const removeReviewFromRecipe = (reviewId: string) => {
      removeReviewFromRecipeMutation.mutate({ reviewId });
   };

   return <RecipeSinglePageContext.Provider value={{}}>{children}</RecipeSinglePageContext.Provider>;
};
