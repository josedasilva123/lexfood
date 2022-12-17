import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { iContextProviderProps, iDefaultErrorResponse } from "../@types";
import { iRecipe } from "../RecipeContext/@types";
import { UserContext } from "../UserContext/UserContext";
import { iFavoriteContext, iFavoriteCreateResponse, iFavoriteDeleteResponse } from "./@types";

export const FavoriteContext = createContext({} as iFavoriteContext);

export const FavoriteProvider = ({ children }: iContextProviderProps) => {
   const { favoriteRecipes, setFavoriteRecipes } = useContext(UserContext);

   const [favoriteModal, setFavoriteModal] = useState(false);

   async function addRecipeToFavoriteList(recipe: iRecipe) {
      if (!favoriteRecipes.some((currentRecipe) => currentRecipe.recipeId === recipe._id)) {
         const newRecipe = {
            recipeId: recipe._id,
            title: recipe.title,
            thumbnail_url: recipe.thumbnail_url,
         };

         try {
            const token = localStorage.getItem("@TOKEN");

            const response = await api.post<iFavoriteCreateResponse>("favorite", newRecipe, {
               headers: {
                  auth: token,
               },
            });
            toast.success(response.data.message);

            setFavoriteRecipes([...favoriteRecipes, newRecipe]);
         } catch (error) {
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            toast.error(currentError.response?.data.error);
         }
      } else {
         toast.error("Está receita já consta na lista favoritos.");
      }
   }

   async function removeRecipeFromFavoriteList(recipeId: string) {
      try {
         const token = localStorage.getItem("@TOKEN");

         const response = await api.delete<iFavoriteDeleteResponse>(`favorite/${recipeId}`, {
            headers: {
               auth: token,
            },
         });

         toast.success(response.data.message);

         const newRecipeList = favoriteRecipes.filter((recipe) => recipe.recipeId !== recipeId);
         setFavoriteRecipes(newRecipeList);
      } catch (error) {
         const currentError = error as AxiosError<iDefaultErrorResponse>;
         toast.error(currentError.response?.data.error);
      }
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
            favoriteModal,
            setFavoriteModal,
            addRecipeToFavoriteList,
            removeRecipeFromFavoriteList,
         }}
      >
         {children}
      </FavoriteContext.Provider>
   );
};
