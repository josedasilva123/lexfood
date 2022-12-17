import React from "react";
import { StyledButton } from "../../../styles/buttons";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { StyledRecipeCard } from "./style";
import { MdFavorite } from "react-icons/md"
import { useContext } from "react";
import { FavoriteContext } from "../../../providers/FavoriteContext/FavoriteContext";

const RecipeCard = ({ recipe }) => {
   const { addRecipeToFavoriteList } = useContext(FavoriteContext);
   
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
