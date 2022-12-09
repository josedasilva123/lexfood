import React from "react";
import { StyledButton } from "../../../styles/buttons";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { StyledRecipeCard } from "./style";
import { MdFavorite } from "react-icons/md"

const RecipeCard = ({ recipe, addRecipeToFavoriteList }) => {
   return (
      <StyledRecipeCard>
         <img src={recipe.thumbnail_url} alt={recipe.title} />
         <div className="content">
            <StyledTitle tag="h3" fontSize="four">{recipe.title}</StyledTitle>
            <StyledParagraph>{recipe.content}</StyledParagraph>
            <StyledButton buttonStyle="outline1" buttonSize="default" onClick={(event) => {
               event.stopPropagation();
               addRecipeToFavoriteList(recipe)
            }}>
               <MdFavorite size={21} /> Favoritar
            </StyledButton>
         </div>
      </StyledRecipeCard>
   );
};

export default RecipeCard;
