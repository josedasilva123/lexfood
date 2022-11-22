import React from 'react'
import { StyledRecipeCard } from './style';

const RecipeCard = ({recipe, removeRecipe}) => {
  return (
    <StyledRecipeCard>
      <h3 className='title three'>
        {recipe.title}
      </h3>
      <p>
        {recipe.description}
      </p>
      <button className='btn default outline1' onClick={() => removeRecipe(recipe.id)}>Remover</button>
    </StyledRecipeCard>
  )
}

export default RecipeCard