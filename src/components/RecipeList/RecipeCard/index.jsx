import React from 'react'

const RecipeCard = ({recipe, removeRecipe}) => {
  return (
    <li>
      <h3>
        {recipe.title}
      </h3>
      <p>
        {recipe.description}
      </p>
      <button onClick={() => removeRecipe(recipe.title)}>Remover</button>
    </li>
  )
}

export default RecipeCard