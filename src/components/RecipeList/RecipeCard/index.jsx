import React from "react";
import { StyledRecipeCard } from "./style";

const RecipeCard = ({ recipe, addRecipeToFavoriteList }) => {
   return (
      <StyledRecipeCard>
         <img src={recipe.thumbnail_url} alt={recipe.title} />
         <div className="content">
            <h3 className="title three">{recipe.title}</h3>
            <p>{recipe.content}</p>
            <button className="btn default outline1" onClick={() => addRecipeToFavoriteList(recipe)}>Favoritar</button>
         </div>
      </StyledRecipeCard>
   );
};

export default RecipeCard;
