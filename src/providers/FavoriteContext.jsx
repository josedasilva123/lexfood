import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { UserContext } from "./UserContext";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
   const { favoriteRecipes, setFavoriteRecipes } = useContext(UserContext);

   const [favoriteModal, setFavoriteModal] = useState(false);

   async function addRecipeToFavoriteList(recipe) {
      if(!favoriteRecipes.some(currentRecipe => currentRecipe.id === recipe._id)){
         try {
            const token = localStorage.getItem("@TOKEN");
            //Atualizando o back-end
            const response = await api.post(
               "favorite",
               {
                  recipeId: recipe._id,
                  title: recipe.title,
                  thumbnail_url: recipe.thumbnail_url,
               },
               {
                  headers: {
                     auth: token,
                  },
               }
            );
            toast.success(response.data.message);
            //Atualizando o front-end
            setFavoriteRecipes([
               ...favoriteRecipes,
               {
                  id: recipe._id,
                  title: recipe.title,
                  thumbnail_url: recipe.thumbnail_url,
               },
            ]);
         } catch (error) {
            toast.error(error.response.data.error);
         }
      } else {
         toast.error("Está receita já consta na lista favoritos.")
      }
      
   }

   async function removeRecipeFromFavoriteList(recipeId) {
      try {
         const token = localStorage.getItem("@TOKEN");
         //Atualizando o back-end
         const response = await api.delete(`favorite/${recipeId}`, {
            headers: {
               auth: token,
            },
         });

         toast.success(response.data.message);

         //Atualizar front-end
         const newRecipeList = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
         setFavoriteRecipes(newRecipeList);
      } catch (error) {
         toast.error(error.response.data.error);
      }
   }

   function addReviewOnFavoriteRecipe(recipeId, review) {
      const newList = favoriteRecipes.map((recipe) => {
         if (recipe._id === recipeId) {
            return { ...recipe, review: review };
         } else {
            return recipe;
         }
      });
      setFavoriteRecipes(newList);
   }

   return (
      <FavoriteContext.Provider
         value={{
            favoriteRecipes,
            favoriteModal,
            setFavoriteModal,
            addRecipeToFavoriteList,
            removeRecipeFromFavoriteList,
            addReviewOnFavoriteRecipe,
         }}
      >
         {children}
      </FavoriteContext.Provider>
   );
};
