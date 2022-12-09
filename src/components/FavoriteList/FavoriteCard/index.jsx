import React from "react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md"
import { FavoriteContext } from "../../../providers/FavoriteContext";
import { StyledTitle } from "../../../styles/typography";
import { StyledFavoriteCard } from "./style";

const FavoriteCard = ({ recipe }) => {
   const { removeRecipeFromFavoriteList } = useContext(FavoriteContext);
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
