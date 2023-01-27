import React, { useContext } from "react";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { iRecipe } from "../../providers/RecipeContext/@types";
import { StyledButton } from "../../styles/buttons";
import { MdFavorite, MdClose } from "react-icons/md";

interface iFavoriteButtonProps {
   currentRecipe: iRecipe;
}

const FavoriteButton = ({ currentRecipe }: iFavoriteButtonProps) => {
   const { favoriteRecipes, addRecipeToFavoriteList, removeRecipeFromFavoriteList } = useContext(FavoriteContext);

   return (
      <>
         {favoriteRecipes?.some((recipe) => recipe.recipeId === String(currentRecipe._id)) ? (
            <StyledButton $buttonSize="round" $buttonStyle="outline1" onClick={() => removeRecipeFromFavoriteList(currentRecipe._id)}>
               <MdClose size={24} />
            </StyledButton>
         ) : (
            <StyledButton $buttonSize="round" $buttonStyle="solid1" onClick={() => addRecipeToFavoriteList(currentRecipe)}>
               <MdFavorite size={24} />
            </StyledButton>
         )}
      </>
   );
};

export default FavoriteButton;
