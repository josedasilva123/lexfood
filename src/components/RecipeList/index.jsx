import React from 'react'
import RecipeCard from "./RecipeCard"
import { StyledRecipeList } from './style';

const RecipeList = ({recipeList, addRecipeToFavoriteList}) => {  
  return (
    <StyledRecipeList>
      {recipeList.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} addRecipeToFavoriteList={addRecipeToFavoriteList} />
      ))}
    </StyledRecipeList>  
  )
}

export default RecipeList