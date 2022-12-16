import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { iProviderProps, iRequestError } from "./@types";
import { UserContext } from "./UserContext";

interface iFavoriteCreateResponse {
   message: string;
}

interface iFavoriteDeleteResponse {
   message: string;
}

interface iRecipe{
   categories: string[];
   content: string;
   createdAt: string;
   updatedAt: string;
   thumbnail_filename: string;
   thumbnail_url: string;
   title: string;
   userID: string;
   _id: string;
}

interface iFavoriteContext{
   favoriteModal: boolean;
   setFavoriteModal: React.Dispatch<React.SetStateAction<boolean>>;
   addRecipeToFavoriteList: (recipe: iRecipe) => void; 
   removeRecipeFromFavoriteList: (recipeId: string) => void;
}

/* favoriteModal,
            setFavoriteModal,
            addRecipeToFavoriteList,
            removeRecipeFromFavoriteList, */
export const FavoriteContext = createContext({} as iFavoriteContext);

export const FavoriteProvider = ({ children }: iProviderProps) => {
   const { favoriteRecipes, setFavoriteRecipes } = useContext(UserContext);

   const [favoriteModal, setFavoriteModal] = useState(false);

   async function addRecipeToFavoriteList(recipe: iRecipe) {
      console.log(recipe);
      if (!favoriteRecipes.some((currentRecipe) => currentRecipe.recipeId === recipe._id)) {
         const newRecipe = {
            recipeId: recipe._id,
            title: recipe.title,
            thumbnail_url: recipe.thumbnail_url,
         };

         try {
            const token = localStorage.getItem("@TOKEN");
            //Atualizando o back-end
            const response = await api.post<iFavoriteCreateResponse>("favorite", newRecipe, {
               headers: {
                  auth: token,
               },
            });
            toast.success(response.data.message);
            //Atualizando o front-end
            setFavoriteRecipes([...favoriteRecipes, newRecipe]);
         } catch (error) {
            const currentError = error as AxiosError<iRequestError>;
            toast.error(currentError.response?.data.error);
         }
      } else {
         toast.error("Está receita já consta na lista favoritos.");
      }
   }

   async function removeRecipeFromFavoriteList(recipeId: string) {
      try {
         const token = localStorage.getItem("@TOKEN");
         //Atualizando o back-end
         const response = await api.delete<iFavoriteDeleteResponse>(`favorite/${recipeId}`, {
            headers: {
               auth: token,
            },
         });

         toast.success(response.data.message);

         //Atualizar front-end
         const newRecipeList = favoriteRecipes.filter((recipe) => recipe.recipeId !== recipeId);
         setFavoriteRecipes(newRecipeList);
      } catch (error) {
         const currentError = error as AxiosError<iRequestError>;
         toast.error(currentError.response?.data.error);
      }
   }

   /*
   function addReviewOnFavoriteRecipe(recipeId: string, review: number) {
      const newList = favoriteRecipes.map((recipe) => {
         if (recipe.recipeId === recipeId) {
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
