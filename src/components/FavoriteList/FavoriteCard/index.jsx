import React from "react";
import { MdDelete } from "react-icons/md"
import { StyledTitle } from "../../../styles/typography";
import { StyledFavoriteCard } from "./style";

const FavoriteCard = ({ recipe, removeRecipeFromFavoriteList, addReviewOnFavoriteRecipe}) => {
   return (
      <StyledFavoriteCard>
         <StyledTitle tag="h3" fontSize="four" fontWeight={700}>{recipe.title}</StyledTitle>
         <button onClick={() => removeRecipeFromFavoriteList(recipe._id)}>
            <MdDelete size={21} />
         </button>
      </StyledFavoriteCard>
   );
};

export default FavoriteCard;
