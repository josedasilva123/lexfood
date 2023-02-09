import React from "react";
import {  StyledLinkButton } from "../../../../styles/buttons";
import { StyledParagraph, StyledTitle } from "../../../../styles/typography";
import { StyledRecipeCard } from "./style";
import { iRecipe } from "../../../../providers/RecipeContext/@types";
import FavoriteButton from "../../../FavoriteButton";

interface iRecipeCardProps {
   recipe: iRecipe;
}

const RecipeCard = ({ recipe }: iRecipeCardProps) => {
   return (
      <StyledRecipeCard>
         <img src={recipe.thumbnail_url} alt={recipe.title} />
         <div className="content">
            <StyledTitle tag="h3" fontSize="four">
               {recipe.title}
            </StyledTitle>
            <StyledParagraph>{recipe.content}</StyledParagraph>
            <div className="buttonBox">
               <FavoriteButton currentRecipe={recipe}/>
               <StyledLinkButton to={`/recipes/${recipe._id}`} $buttonSize="small" $buttonStyle="outline1">
                  Saiba mais
               </StyledLinkButton>
            </div>
         </div>
      </StyledRecipeCard>
   );
};

export default RecipeCard;
