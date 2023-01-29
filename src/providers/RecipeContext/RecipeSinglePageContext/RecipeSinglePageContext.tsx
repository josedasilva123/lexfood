import { createContext } from "react";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import { iContextProviderProps, iDefaultErrorResponse } from "../../@types";
import { iRecipe } from "../@types";
import { iRecipeGetOneResponse, iRecipeSinglePageContext, iReviewCreateResponse, iReviewDeleteResponse } from "./@types";
import { iReviewFormValues } from "../../../components/Form/ReviewCreateForm/@types";

export const RecipeSinglePageContext = createContext({} as iRecipeSinglePageContext);

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
      mutationFn: async ({ formData }: { formData: iReviewFormValues }) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const newReview = { ...formData, score: +formData.score, recipeId: recipe?._id };

            const response = await api.post<iReviewCreateResponse>("review", newReview, {
               headers: {
                  auth: token,
               },
            });

            return response.data;
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            toast.error(currentError.response?.data.error);
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
   });

   const addReviewToRecipe = (formData: iReviewFormValues) => {
      addReviewToRecipeMutation.mutate({ formData });
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

   const editReviewFromRecipeMutation = useMutation({
      mutationFn: async ({ formData, reviewId }: { formData: iReviewFormValues; reviewId: string }) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const newReview = { ...formData, score: +formData.score };

            const response = await api.patch<iReviewDeleteResponse>(`review/${recipe?._id}/${reviewId}`, newReview, {
               headers: {
                  auth: token,
               },
            });

            return { newReview, reviewId, message: response.data.message };
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            throw new Error(currentError.response?.data.error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData("recipe", (currentData) => {
            const currentRecipe = currentData as iRecipe;
            const newReviewList = currentRecipe.reviews.map((review) => {
               if (review._id === data.reviewId) {
                  return { ...review, content: data.newReview.content, score: data.newReview.score };
               } else {
                  return review;
               }
            });
            return { ...currentRecipe, reviews: newReviewList };
         });
         toast.success(data.message);
      },
      onError: (error) => {
         toast.error(error as string);
      },
   });

   const editReviewFromRecipe = (formData: iReviewFormValues, reviewId: string) => {
      editReviewFromRecipeMutation.mutate({ formData, reviewId });
   };

   return (
      <RecipeSinglePageContext.Provider value={{ recipe, recipeLoading, addReviewToRecipe, removeReviewFromRecipe, editReviewFromRecipe }}>
         {children}
      </RecipeSinglePageContext.Provider>
   );
};
