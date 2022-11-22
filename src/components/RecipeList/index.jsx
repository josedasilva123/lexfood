import React from 'react'
import RecipeCard from "./RecipeCard"
import { StyledRecipeList } from './style';

const RecipeList = ({recipeList, removeRecipe}) => {  
  return (
    <StyledRecipeList>
      {recipeList.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} removeRecipe={removeRecipe} />
      ))}
    </StyledRecipeList>  
  )
}

export default RecipeList