import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {  

   const localStorageFavorites = localStorage.getItem("@FAVORITE_LIST");

   const [favoriteList, setFavoriteList] = useState(localStorageFavorites ? JSON.parse(localStorageFavorites) : []);
   const [favoriteModal, setFavoriteModal] = useState(false);

   useEffect(() => {
      localStorage.setItem("@FAVORITE_LIST", JSON.stringify(favoriteList));
   }, [favoriteList]);

   function addRecipeToFavoriteList(recipe) {
      if (!favoriteList.some((favoriteRecipe) => favoriteRecipe._id === recipe._id)) {
         setFavoriteList([...favoriteList, recipe]);
         setFavoriteModal(true);
         toast.success("Receita favoritada com sucesso!");
      } else {
         toast.error("Essa receita já está favoritada.");
      }
   }

   function removeRecipeFromFavoriteList(recipeId) {
      const newList = favoriteList.filter((recipe) => recipe._id !== recipeId);
      setFavoriteList(newList);
      toast.warn("Receita desfavoritada com sucesso!");
   }

   function addReviewOnFavoriteRecipe(recipeId, review) {
      //Utilizar o map para alterar um item específico de uma lista
      const newList = favoriteList.map((recipe) => {
         if (recipe._id === recipeId) {
            return { ...recipe, review: review };
         } else {
            return recipe;
         }
      });
      setFavoriteList(newList);
   }

   return (
      <FavoriteContext.Provider
         value={{
            favoriteList,
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
