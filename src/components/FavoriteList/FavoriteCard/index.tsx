import { useContext } from "react";
import { MdDelete } from "react-icons/md"
import { FavoriteContext } from "../../../providers/FavoriteContext/FavoriteContext";
import { iFavoriteRecipe } from "../../../providers/UserContext/@types";
import { StyledTitle } from "../../../styles/typography";
import { StyledFavoriteCard } from "./style";

interface iFavoriteCardProps{
   recipe: iFavoriteRecipe;
}

const FavoriteCard = ({ recipe }: iFavoriteCardProps) => {
   const { removeRecipeFromFavoriteList } = useContext(FavoriteContext);
   return (
      <StyledFavoriteCard>
         <StyledTitle tag="h3" fontSize="four" fontWeight={700}>{recipe.title}</StyledTitle>
         <button onClick={() => removeRecipeFromFavoriteList(recipe.recipeId)}>
            <MdDelete size={21} />
         </button>
      </StyledFavoriteCard>
   );
};

export default FavoriteCard;
