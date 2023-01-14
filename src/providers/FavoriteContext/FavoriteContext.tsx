import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { iContextProviderProps, iDefaultErrorResponse } from "../@types";
import { iRecipe } from "../RecipeContext/@types";
import { iFavoriteRecipe, iUser, iUserAutoLoginResponse } from "../UserContext/@types";
import { UserContext } from "../UserContext/UserContext";
import { iFavoriteContext, iFavoriteCreateResponse, iFavoriteDeleteResponse } from "./@types";

export const FavoriteContext = createContext({} as iFavoriteContext);

export const FavoriteProvider = ({ children }: iContextProviderProps) => {
   const { user } = useContext(UserContext);
   const [favoriteModal, setFavoriteModal] = useState(false);

   const queryClient = useQueryClient();

   const addRecipeToFavoriteListMutation = useMutation({
      mutationFn: async ({ newRecipe }: { newRecipe: iFavoriteRecipe}) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const response = await api.post<iFavoriteCreateResponse>("favorite", newRecipe, {
               headers: {
                  auth: token,
               },
            });

            return {recipe: newRecipe, message: response.data.message };
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            throw new Error(currentError.response?.data.error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData<iUser>('user', (currentData) => {
            const user = currentData as iUser;
            return { ...user, favoriteRecipes: [...user.favoriteRecipes, data.recipe]}
         })         
         toast.success(data.message);
      },
      onError: (error) => {
         toast.error(error as string);
      }      
   })
   
   const addRecipeToFavoriteList = (recipe: iRecipe) => {
      if (!user?.favoriteRecipes.some((currentRecipe) => currentRecipe.recipeId === recipe._id)) {
         const newRecipe = {
            recipeId: recipe._id,
            title: recipe.title,
            thumbnail_url: recipe.thumbnail_url,
         };

         addRecipeToFavoriteListMutation.mutate({ newRecipe });
      } else {
         toast.error("Está receita já consta na lista favoritos.");
      }
   }

   const removeRecipeFromFavoriteListMutation = useMutation({
      mutationFn: async ({ recipeId }: { recipeId: string}) => {
         try {
            const token = localStorage.getItem("@TOKEN");

            const response = await api.delete<iFavoriteDeleteResponse>(`favorite/${recipeId}`, {
               headers: {
                  auth: token,
               },
            });

            return { recipeId, message: response.data.message }
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            throw new Error(currentError.response?.data.error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData<iUser>('user', (currentData) => {
            const user = currentData as iUser;
            const newFavoriteRecipes = user.favoriteRecipes?.filter((recipe) => recipe.recipeId !== data.recipeId);
            return { ...user, favoriteRecipes: newFavoriteRecipes};
         })
         toast.success(data.message);
      },
      onError: (error) => {
         toast.error(error as string);
      }      
   })
   
   const removeRecipeFromFavoriteList = (recipeId: string) => {
      removeRecipeFromFavoriteListMutation.mutate({recipeId})
   }

   /*
   function addReviewOnFavoriteRecipe(recipeId:, review) {
      const newList = favoriteRecipes.map((recipe) => {
         if (recipe._id === recipeId) {
            return { ...recipe, review: review };
         } else {
            return recipe;
         }
      });
      setFavoriteRecipes(newList);
   }
   */

   return (
      <FavoriteContext.Provider
         value={{
            favoriteRecipes: user?.favoriteRecipes,
            favoriteModal,
            setFavoriteModal,
            addRecipeToFavoriteList,
            removeRecipeFromFavoriteList
         }}
      >
         {children}
      </FavoriteContext.Provider>
   );
};
