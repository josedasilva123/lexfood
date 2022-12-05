import React from 'react'
import RecipeCard from "./RecipeCard"
import { StyledRecipeList } from './style';

const RecipeList = ({filteredRecipeList, addRecipeToFavoriteList}) => {  
  return (
    <StyledRecipeList>
      {filteredRecipeList.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} addRecipeToFavoriteList={addRecipeToFavoriteList} />
      ))}
    </StyledRecipeList>  
  )
}

export default RecipeList