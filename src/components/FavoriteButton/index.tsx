import { useContext } from "react";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { iRecipe } from "../../providers/RecipeContext/@types";
import { StyledButton } from "../../styles/buttons";
import { MdFavorite, MdCancel } from "react-icons/md";

interface iFavoriteButtonProps {
   currentRecipe: iRecipe;
}

const FavoriteButton = ({ currentRecipe }: iFavoriteButtonProps) => {
   const { favoriteRecipes, addRecipeToFavoriteList, removeRecipeFromFavoriteList } = useContext(FavoriteContext);

   return (
      <>
         {favoriteRecipes?.some((recipe) => recipe.recipeId === String(currentRecipe._id)) ? (
            <StyledButton $buttonSize="round" $buttonStyle="outline1" title="Desfavoritar receita" onClick={() => removeRecipeFromFavoriteList(currentRecipe._id)}>
               <MdCancel size={24} />
            </StyledButton>
         ) : (
            <StyledButton $buttonSize="round" $buttonStyle="solid1" title="Favoritar receita" onClick={() => addRecipeToFavoriteList(currentRecipe)}>
               <MdFavorite size={24} />
            </StyledButton>
         )}
      </>
   );
};

export default FavoriteButton;
